import packetTypes from '../constants/packet-types.constants.js';
import { createUser, findUserByUserId, updateUserLogin } from '../db/user/user.db.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { userRedis } from '../utils/redis.utils.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import configs from '../config/configs.js';
import bcrypt from 'bcrypt';

const signInHandler = async (socket, userId, packetType, payload, io) => {
  try {
    console.log('signInHandler');
    console.log(payload);
    /// 아이디/비번 체크
    const { id, password } = payload;
    const userDB = await findUserByUserId(id);
    if (!userDB) {
      throw new Error('존재하지 않는 아이디입니다.');
    }
    console.log('userDB', userDB);
    if (!(await bcrypt.compare(password, userDB.password))) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    // sign JWT token
    const token = jwt.sign(
      {
        id: userDB.id,
      },
      configs.env.jwtSecret
    );
    const uuid = userDB.uuid;

    // console.log(socket);
    let userRD = await userRedis.getUserData(uuid);
    if (!userRD) {
      console.log('새로운 Redis 데이터 생성');
      await userRedis.createUserData(uuid, token);
      userRD = await userRedis.getUserData(uuid);
    }

    socket.userId = uuid;
    const data = new ResponsePacket(0, '로그인 성공', { token: token, userId: uuid });

    const packet = serialize(packetTypes.SIGN_IN_RESPONSE, data);
    // console.log(deserialize(packet)); // 테스트용 역직렬화
    // console.log(packet.packet.constructor.name);
    socket.emit('event', packet);
  } catch (err) {
    console.error('로그인 중 오류 발생', err);
    const errorData = new ResponsePacket(1, '로그인 실패');
    const errorPacket = serialize(packetTypes.SIGN_IN_RESPONSE, errorData);
    socket.emit('event', errorPacket);
  }
};

export default signInHandler;

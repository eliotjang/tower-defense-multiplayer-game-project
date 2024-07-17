import packetTypes from '../constants/packet-types.constants.js';
import { findUserByUserId, updateUserLogin } from '../db/user/user.db.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { serialize } from '../utils/packet-serializer.utils.js';
import jwt from 'jsonwebtoken';
import configs from '../config/configs.js';
import bcrypt from 'bcrypt';
import { userSessionsManager } from '../sessions/user.session.js';

const signInHandler = async (socket, userId, packetType, payload, io) => {
  try {
    /// 아이디/비번 체크
    const { id, password } = payload;
    const userDB = await findUserByUserId(id);
    console.log('userDB:', userDB);
    if (!userDB) {
      throw new Error('존재하지 않는 아이디입니다.');
    }
    if (!(await bcrypt.compare(password, userDB.password))) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    // sign JWT token
    const token = jwt.sign(
      {
        id: userDB.userId,
      },
      configs.env.jwtSecret
    );
    socket.token = token;
    socket.uuid = userDB.uuid;

    await updateUserLogin(userDB.id);
    userSessionsManager.addUser(userDB.uuid, socket);

    const data = new ResponsePacket(0, '로그인 성공', { token: token, uuid: userDB.uuid });
    // console.log(data);
    const packet = serialize(packetTypes.SIGN_IN_RESPONSE, data);
    socket.emit('event', packet);
  } catch (err) {
    console.error('로그인 중 오류 발생', err);
    const errorData = new ResponsePacket(1, '로그인 실패');
    const errorPacket = serialize(packetTypes.SIGN_IN_RESPONSE, errorData);
    socket.emit('event', errorPacket);
  }
};

export default signInHandler;

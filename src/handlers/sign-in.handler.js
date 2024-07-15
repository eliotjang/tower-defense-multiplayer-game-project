import packetTypes from '../constants/packet-types.constants.js';
import { createUser, findUserByUserId, updateUserLogin } from '../db/user/user.db.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { userRedis } from '../utils/redis.utils.js';
import { v4 as uuidv4 } from 'uuid';

const signInHandler = async (socket, userId, packetType, payload, io) => {
  console.log('signInHandler');
  console.log(payload);
  // sign JWT token
  const signedToken = 'token';

  // 아이디 임의 생성
  const password = '1234';
  // userId = uuidv4();
  const uuid = uuidv4();
  const token = '임시 생성 토큰';

  let userDB = await findUserByUserId(uuid);
  if (!userDB) {
    userDB = await createUser(uuid, password);
    console.log('새로운 유저가 DB에 등록되었습니다.');
  } else {
    await updateUserLogin(userDB.userId);
    console.log('기존 유저 정보를 불러옵니다.');
  }

  // console.log(socket);
  let userRD = await userRedis.getUserData(uuid);
  if (!userRD) {
    console.log('새로운 Redis 데이터 생성');
    await userRedis.createUserData(uuid, userDB.uuid, token);
    userRD = await userRedis.getUserData(uuid);
  }

  console.log(userRD); // 레디스 생성 확인 로그
  // console.log(userDB); // 데이터베이스 생성 확인 로그

  // 패킷 생성
  // const data = {
  //   success: true,
  //   message: '로그인 성공',
  //   failCode: 0,
  //   payload: { token: signedToken },
  // };

  socket.userId = uuid;

  const data = new ResponsePacket(0, '로그인 성공', { token: signedToken, userId: uuid });

  const packet = serialize(packetTypes.SIGN_IN_RESPONSE, data);
  console.log(deserialize(packet)); // 테스트용 역직렬화
  // console.log(packet.packet.constructor.name);
  socket.emit('event', packet);
};

export default signInHandler;

import packetTypes from '../constants/packet-types.constants.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';

const signInHandler = (socket, userId, packetType, payload, io) => {
  console.log('signInHandler');
  console.log(payload);
  // sign JWT token
  const signedToken = 'token';

  // 패킷 생성
  // const data = {
  //   success: true,
  //   message: '로그인 성공',
  //   failCode: 0,
  //   payload: { token: signedToken },
  // };

  const data = new ResponsePacket(0, '로그인 성공', { token: signedToken });

  const packet = serialize(packetTypes.SIGN_IN_RESPONSE, data);
  console.log(deserialize(packet)); // 테스트용 역직렬화
  // console.log(packet.packet.constructor.name);
  socket.emit('event', packet);
};

export default signInHandler;

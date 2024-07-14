import packetTypes from '../constants/packet-types.constants.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';

const signInHandler = (socket, userId, packetType, payload, io) => {
  console.log('signInHandler');
  console.log(payload);
  // sign JWT token
  const signedToken = 'token';

  // create packet
  const data = {
    success: true,
    message: '로그인 성공',
    failCode: 0,
    payload: { token: signedToken },
  };

  const packet = serialize(packetTypes.SIGN_IN_RESPONSE, data, true);
  console.log(deserialize(packet)); // 테스트용 역직렬화
  // console.log(packet.packet.constructor.name);
  socket.emit('event', packet);
};

export default signInHandler;

import packetTypes from '../constants/packet-types.constants.js';
import RequestPacket from '../protobuf/classes/request.proto.js';

const gameOverHandler = ({ socket, packetType, payload }) => {
  // ??
  const gameEndPacket = new RequestPacket('token', null, { timestamp: Date.now() });
  socket.sendEventProto(packetTypes.GAME_END_REQUEST, gameEndPacket);
};

export default gameOverHandler;

import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';

const chattingHandler = async (socket, userId, packetType, payload, io) => {
  const { chattingMessage } = payload;
  console.log(chattingMessage);
  const packet = serialize(packetTypes.CHATTING_NOTIFICATION, { chattingMessage });
  // console.log(deserialize(packet)); // 테스트용 역직렬화
  // console.log(packet.packet.constructor.name);
  socket.broadcast.emit('event', packet);
};

export default chattingHandler;

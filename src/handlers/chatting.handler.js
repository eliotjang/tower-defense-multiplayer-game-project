import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import { gameSessionsManager as gsm } from '../sessions/game.session.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';

const chattingRequestHandler = async (socket, userId, packetType, payload, io) => {
  const { chat } = payload;

  chattingNotification(socket, chat);
};

const chattingNotification = (socket, chat) => {
  const packetType = packetTypes.CHATTING_NOTIFICATION;
  const notificationPacket = new NotificationPacket('채팅 전송', { chat });

  const packet = serialize(packetType, notificationPacket);
  // const test = deserialize(packet, true);
  // console.log(test);

  const other = gsm.getOtherGameUserByMyUuid(socket.gameId, socket.uuid);
  other.socket.emit('event', packet);
};

export default chattingRequestHandler;

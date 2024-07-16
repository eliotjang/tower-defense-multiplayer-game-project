import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import { serialize } from '../utils/packet-serializer.utils.js';

// 데이터를 대결하는 사용자에게 전송하는 함수
export const monsterSpawnHandler = async (socket, userId, packetType, payload, io) => {
  const { paths, monsterLevel, monsterNumber } = payload;
  const notPacketType = packetTypes.MONSTER_SPAWN_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 몬스터 넘버 전송', { monsterNumber });

  const packet = serialize(notPacketType, notificationPacket);

  socket.broadcast.emit('event', packet);
};

import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';

// 데이터를 대결하는 사용자에게 전송하는 함수
export const monsterSpawnHandler = async (socket, userId, packetType, payload, io) => {
  // console.log('monsterSpawnHandler');
  const { monsterNumber, monsterIndex } = payload;

  const notPacketType = packetTypes.MONSTER_SPAWN_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 몬스터 생성', { monsterNumber, monsterIndex });

  const packet = serialize(notPacketType, notificationPacket);
  // const test = deserialize(packet, true);
  // console.log(test);

  socket.broadcast.emit('event', packet);
};

export const monsterKillRequestHandler = async (socket, userId, packetType, payload, io) => {
  const { monsterIndex } = payload;

  const notPacketType = packetTypes.MONSTER_KILL_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 몬스터 사망', { monsterIndex });

  const packet = serialize(notPacketType, notificationPacket);
  // const test = deserialize(packet, true);
  // console.log(test);

  socket.broadcast.emit('event', packet);
};

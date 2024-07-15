import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';

export const towerAttackRequestHandler = async (socket, uuid, packetType, payload, io) => {
  // console.log('towerAttackRequestHandler');
  const { timestamp, userId, towerIndex, monsterIndex } = payload;

  towerAttackNotification(socket, towerIndex, monsterIndex);
};

const towerAttackNotification = (socket, towerIndex, monsterIndex) => {
  const packetType = packetTypes.TOWER_ATTACK_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 타워가 적 몬스터 공격 메세지', { towerIndex, monsterIndex });

  const packet = serialize(packetType, notificationPacket);
  // const test = deserialize(packet, true);
  // console.log(test);

  socket.broadcast.emit('event', packet);
};

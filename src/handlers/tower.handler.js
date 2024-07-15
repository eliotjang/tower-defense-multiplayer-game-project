import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';
import packetTypes from '../constants/packet-types.constants.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';

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

export const purchaseTowerHandler = (socket, token, packetType, payload, io) => {
  /*
  유저 골드 서버와 클라 검증로직 추가
  에셋 사용하면 타워도 검증?
  역직렬화, 직렬화 코드 추가
  */
  //const redisClient = redis.createClient(configs.env.redisHost, configs.env.redisPort);

  const { x, y, userGold, userId, towerCost, index } = payload;
  const towerData = { x, y };
  if (towerCost > userGold) {
    console.log('골드가 부족합니다');
  }
  // if (index !== serverIndex) {
  // console.log('비정상적인 index값입니다');
  // }
  // console.log(index);
  let newUserGold = userGold + 50;
  // towerRedis.createTowerData(userId, towerData, serverIndex);
  gameRedis.patchGameDataTower(userId, towerData, index);
  // console.log(`${userId}님 타워 추가`);
  // console.log(towers);
  //응답 패킷 인코딩
  const resPacketType = packetTypes.TOWER_PURCHASE_RESPONSE;
  const resPacket = new ResponsePacket(0, '타워 구입 성공', { newUserGold, x, y });
  //통지 패킷 인코딩
  const notificationPacketType = packetTypes.TOWER_PURCHASE_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 타워 추가!', { x, y });

  const encodeResPacket = serialize(resPacketType, resPacket);
  const encodeNotificationPacket = serialize(notificationPacketType, notificationPacket);
  socket.emit('event', encodeResPacket); //패킷응답
  socket.broadcast.emit('event', encodeNotificationPacket); //패킷통지
};

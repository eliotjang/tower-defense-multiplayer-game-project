import packetTypes from '../constants/packet-types.constants.js';
import { getGameAssets } from '../init/assets.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { gameSessionsManager as gsm } from '../sessions/game.session.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';

// 데이터를 대결하는 사용자에게 전송하는 함수
export const monsterSpawnHandler = async (socket, userId, packetType, payload, io) => {
  // console.log('monsterSpawnHandler');
  const game = gsm.getGame(socket.gameId);

  // 게임이 진행 중이 아닐 때 정보 갱신 방지
  if (!game.isPlaying()) {
    return;
  }

  const { monsterNumber, monsterIndex } = payload;

  const notPacketType = packetTypes.MONSTER_SPAWN_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 몬스터 생성', { monsterNumber, monsterIndex });

  const packet = serialize(notPacketType, notificationPacket);

  game.emitToOther(socket.uuid, 'event', packet);
};

export const monsterKillRequestHandler = async (socket, userId, packetType, payload, io) => {
  const game = gsm.getGame(socket.gameId);

  // 게임이 진행 중이 아닐 때 정보 갱신 방지
  if (!game.isPlaying()) {
    return;
  }

  const { monsterIndex } = payload;
  const { gameAsset } = getGameAssets();
  const { killReward } = gameAsset.data;

  await gameRedis.patchGameDataGold(socket.uuid, killReward);
  const gameRD = await gameRedis.getGameData(socket.uuid);

  const resPacketType = packetTypes.MONSTER_KILL_RESPONSE;
  const responsePacket = new ResponsePacket(0, '몬스터 처치', { userGold: gameRD.user_gold });
  {
    const packet = serialize(resPacketType, responsePacket);
    socket.emit('event', packet);
  }

  const notPacketType = packetTypes.MONSTER_KILL_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 몬스터 사망', { monsterIndex });

  const packet = serialize(notPacketType, notificationPacket);

  game.emitToOther(socket.uuid, 'event', packet);
};

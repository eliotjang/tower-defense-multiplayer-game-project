import { gameStates } from '../constants/game.constants.js';
import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { gameSessionsManager as gsm } from '../sessions/game.session.js';
import { SuccessCodes } from '../utils/errors/errorCodes.js';
import { serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';

const baseHandler = async (socket, userId, packetType, payload, io) => {
  const game = gsm.getGame(socket.gameId);

  // 게임이 진행 중이 아닐 때 정보 갱신 방지
  if (!game.isPlaying()) {
    return;
  }
  const { monsterDamage } = payload;

  // 베이스 체력 감소
  const baseHp = await gameRedis.patchGameDataBaseHp(socket.uuid, -monsterDamage);
  // console.log(`${socket.uuid}'s base HP: ${baseHp}`);

  if (baseHp <= 0) {
    // 게임 정보 동결하여 업데이트 멈추기
    // game.setGameState(gameStates.ENDING);

    // 패킷 생성 및 직렬화
    const myPacket = new NotificationPacket('패배', { isWin: false, baseHp }); // score: });
    const mySerialized = serialize(packetTypes.GAME_OVER_NOTIFICATION, myPacket);
    const opPacket = new NotificationPacket('승리', { isWin: true, baseHp });
    const opSerialized = serialize(packetTypes.GAME_OVER_NOTIFICATION, opPacket);

    // 통지
    socket.emit('event', mySerialized);
    game.emitToOther(socket.uuid, 'event', opSerialized);

    return;
  }

  // BaseAttackedResponse: 패킷 생성 및 직렬화
  const myPacket = new ResponsePacket(SuccessCodes.SUCCESS, `내 기지 체력`, { isOpponent: false, baseHp });
  const mySerialized = serialize(packetTypes.BASE_ATTACKED_RESPONSE, myPacket);
  const opPacket = new ResponsePacket(SuccessCodes.SUCCESS, `상대의 기지 체력`, { isOpponent: true, baseHp });
  const opSerialized = serialize(packetTypes.BASE_ATTACKED_RESPONSE, opPacket);

  // 패킷 전송
  socket.emit('event', mySerialized);
  game.emitToOther(socket.uuid, 'event', opSerialized);
};

export default baseHandler;

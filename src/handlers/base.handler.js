import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';

const baseHandler = async (socket, userId, packetType, payload, io) => {
  // await userRedis.setUserData(userDB.userId, { test: 'temp' });
  const { monsterDamage } = payload;
  console.log(`monsterDamage: ${monsterDamage}`);

  // 몬스터 제거 처리? 는 사망 이벤트에서 처리

  // 베이스 체력 감소
  const baseHp = await gameRedis.patchGameDataBaseHp(socket.userId, -monsterDamage);
  if (baseHp < 0) {
    // 게임 정보 동결하여 업데이트 멈추기?

    // GameOverNotification 통지 (모든 유저)
    const myPacket = new NotificationPacket('아쉽지만 대결에서 패배하셨습니다! 다음 대결에서는 꼭 이기세요!', {
      isWin: false,
    });
    const mySerialized = serialize(packetTypes.GAME_OVER_NOTIFICATION, myPacket);
    socket.emit('event', mySerialized);
    const opPacket = new NotificationPacket('당신이 게임에서 승리했습니다!', { isWin: true });
    const opSerialized = serialize(packetTypes.GAME_OVER_NOTIFICATION, opPacket);
    socket.emit('event', opSerialized);
    return;
  }

  // BaseAttackedResponse: 바뀐 체력 통지, proto message 이름 변경 필요
  const myPacket = new ResponsePacket(0, `내 기지 체력`, { isOpponent: false, baseHp });
  const mySerialized = serialize(packetTypes.BASE_ATTACKED_RESPONSE, myPacket);
  socket.emit('event', mySerialized);
  const opPacket = new ResponsePacket(0, `${socket.userId}의 기지 체력`, { isOpponent: true, baseHp });
  const opSerialized = serialize(packetTypes.BASE_ATTACKED_RESPONSE, opPacket);
  socket.emit('event', opSerialized);
};

export default baseHandler;

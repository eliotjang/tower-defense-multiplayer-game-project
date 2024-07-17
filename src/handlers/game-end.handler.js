import { createMatchHistory } from '../db/user/user.db.js';
import { gameSessionsManager as gsm } from '../sessions/game.session.js';
import { removeUserGameData } from '../utils/data-remover.utils.js';
import { gameRedis, userRedis } from '../utils/redis.utils.js';

const gameEndHandler = async (socket, userId, packetType, payload, io) => {
  console.log('gameEndHandler:', payload);

  // 게임 데이터 가져오기
  const gameData = await gameRedis.getGameData(socket.uuid);
  console.log(`[${socket.uuid}]'s gameData:`, gameData);

  // 게임 데이터 정리 / 유저 상태 후처리
  const results = await gsm.endGame(socket.gameId);
  if (results === null) {
    return;
  }

  for (const user of results.users) {
    removeUserGameData(user);
  }

  console.log(`[${socket.gameId}] game results:`, results);

  socket.gameId = null;

  createMatchHistory(results.users[0].uuid, results.users[1].uuid, results.startTime, results.endTime, results.score);
};

export default gameEndHandler;

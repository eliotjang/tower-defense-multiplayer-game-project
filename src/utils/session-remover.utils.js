import { createMatchHistory } from '../db/user/user.db.js';
import { gameSessionsManager as gsm } from '../sessions/game.session.js';
import { userSessionsManager as usm } from '../sessions/user.session.js';
import { gameRedis } from './redis.utils.js';

export const removeUserSession = async (uuid, forceRemove) => {
  try {
    if (!uuid) {
      // 세션이 존재하지 않음
      return true;
    }

    const game = gsm.findGameByUuid(uuid);
    if (!forceRemove && game) {
      // 게임 세션이 존재하면 제거 불가
      console.log('removeUserSession failed: 해당 유저의 게임 세션이 존재함');
      return false;
    }
    if (forceRemove && game) {
      await removeGameSession(uuid, game.gameId);
    }

    // userSession 제거
    usm.removeUserByUuid(uuid);
  } catch (err) {
    console.error('remomveUserSession 오류:', err);
  }
};

export const removeGameSession = async (uuid, gameId) => {
  try {
    if (!uuid) {
      return false;
    }

    // gameSession
    const game = gameId ? gsm.getGame(gameId) : gsm.findGameByUuid(uuid);

    if (!game) {
      // 게임이 존재하지 않음 (이미 제거됨)
      console.log('removeGameSession failed: 게임 세션이 존재하지 않음');
      return true;
    }

    // 게임이 PLAYING이면 종료하고 상대 승리
    if (game.isPlaying()) {
      const results = await gsm.endGame(game.gameId);

      if (!results) {
        // 게임이 이미 종료중임
        if (results === false) {
          throw new Error('게임이 이미 종료중임');
        }
        throw new Error('게임이 이미 종료됨');
      }

      const winner = gsm.getOtherGameUserByMyUuid(game.gameId, uuid);
      if (!winner) {
        throw new Error('상대가 없습니다.');
      }

      await createMatchHistory(winner.uuid, uuid, results.startTime, results.endTime, results.score);

      for (const user of results.users) {
        Promise.all([gameRedis.removeGameData(user.uuid), gameRedis.deleteGameDataTowerList(user.uuid)]);
        user.socket.gameId = null;
      }

      gsm.deleteGameSession(game.gameId);

      return true;
    }

    // WAITING이면 유저만 게임에서 제거
    if (game.isWaiting()) {
      gsm.removeUser(gameId);
      return true;
    }
    return false;
  } catch (err) {
    console.error('removeGameSession 오류:', err);
  }
};

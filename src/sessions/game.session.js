import User from '../models/user.model.js';
import { gameStates } from '../constants/game.constants.js';
import { v4 as uuidv4 } from 'uuid';
import Game from '../models/game.model.js';
import { gameRedis } from '../utils/redis.utils.js';

const gameSessions = {};

export const gameSessionsManager = {
  createGame: function (gameId) {
    if (typeof gameId === 'undefined' || gameId === null) {
      gameId = uuidv4();
    }
    const game = new Game(gameId);
    gameSessions[gameId] = game;
    console.log('새 게임 세션 생성, ID:', game.gameId);
    return game;
  },

  /**
   * 시간 복잡도 O(1), 게임 세션 가져오기
   * @param {string} gameId 게임의 uuid
   * @returns {Game} 해당하는 게임 세션, 없다면 undefined
   */
  getGame: function (gameId) {
    // return gameSessions.find((game) => game.gameId === gameId);
    return gameSessions[gameId];
  },

  /**
   *
   * @param {User} user User class instance
   * @returns {string} gameId, or null if failed to join any games
   */
  joinWaitingGame: async function (user) {
    let foundGame;
    for (const game of Object.values(gameSessions)) {
      if (game.gameState === gameStates.WAITING) {
        foundGame = game;
        break;
      }
    }
    if (!foundGame) {
      foundGame = await this.createGame();
    }
    // 유저 참가
    await foundGame.addUser(user);
    console.log('gameSessions:', Object.keys(gameSessions));
    console.log(
      'Joined:',
      foundGame.gameId,
      '  | Users:',
      foundGame.users.map((user) => user.uuid)
    );

    return foundGame;
  },

  getOtherGameUserByMyUuid: function (gameId, myUuid) {
    const game = this.getGame(gameId);
    if (game) {
      return game.getOtherUserByMyUuid(myUuid);
    }
    return null;
  },

  findGameByUuid: function (uuid) {
    for (const game of Object.values(gameSessions)) {
      if (game.getUserByUuid(uuid)) {
        return game;
      }
    }
    return null;
  },

  removeUser: async function (gameId, uuid) {
    const game = this.getGame(gameId);
    if (!game) {
      // 게임이 존재하지 않음
      return true;
    }

    game.removeUserByUuId(uuid);
    if (game.users.length === 0) {
      delete gameSessions[gameId];
    }
  },

  /**
   * 게임을 종료하고 결과를 반환합니다.
   * @param {*} gameId
   * @returns
   */
  endGame: async function (gameId) {
    if (gameSessions[gameId]) {
      if (gameSessions[gameId].isEnding()) {
        return false;
      }
      gameSessions[gameId].setGameState(gameStates.ENDING);
      const results = gameSessions[gameId].wrapResults();
      console.log(`게임 종료 ( gameId: ${gameId} )`);

      // 유의미한 데이터 추출
      let maxScore = 0;
      for (const user of gameSessions[gameId].users) {
        const gameData = await gameRedis.getGameData(user.uuid);
        console.log(user.uuid, gameData);
        maxScore = Math.max(maxScore, gameData.score);
      }

      // 게임 결과에 추출된 정보 추가
      results.score = maxScore;

      // 결과 반환
      return results;
    }
    return null;
  },

  deleteGameSession: function (gameId) {
    // 게임 세션 제거
    delete gameSessions[gameId];
    console.log('게임 세션 제거 완료, ID:', gameId);
  },
};

import User from '../models/user.model.js';
import { gameStates } from '../constants/game.constants.js';
import { v4 as uuidv4 } from 'uuid';
import Game from '../models/game.model.js';

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
  joinWaitingGame: function (user) {
    let foundGame;
    for (const game of Object.values(gameSessions)) {
      if (game.gameState === gameStates.WAITING) {
        foundGame = game;
        break;
      }
    }
    if (!foundGame) {
      foundGame = this.createGame();
    }
    // 유저 참가
    foundGame.addUser(user);

    return foundGame;
  },

  getOtherGameUserByMyUuid: function (gameId, myUuid) {
    const game = this.getGame(gameId);
    if (game) {
      return game.getOtherUserByMyUuid(myUuid);
    }
    return null;
  },

  removeUser: function (gameId, uuid) {
    const game = this.getGame(gameId);
    game.removeUserByUuId(uuid);
    if (game.users.length === 0 && game.isEnding()) {
      delete gameSessions[gameId];
    }
  },

  removeGameSessionByGameId: function (gameId) {
    if (gameSessions[gameId]) {
      gameSessions[gameId].endGame();
      delete gameSessions[gameId];
      console.log('게임 세션 제거 완료, ID:', gameId);
    }
  },
};

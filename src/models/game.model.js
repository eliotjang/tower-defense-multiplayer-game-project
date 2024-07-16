import { gameStates } from '../constants/game.constants.js';
import User from './user.model.js';

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.gameState = gameStates.WAITING;
    this.users = [];
  }

  addUser(user) {
    if (!(user instanceof User)) {
      throw new Error('추가할 유저가 없습니다.');
    }
    if (this.users.length >= 2) {
      return false;
    }
    this.users.push(user);
    user.socket.gameId = this.gameId;
    if (this.users.length == 2) {
      this.gameState = gameStates.PLAYING;
    }
    return true;
  }

  getOtherUserByMyUuid(myUuid) {
    const otherUser = this.users.find((user) => user.uuid !== myUuid);
    if (otherUser) {
      return otherUser;
    }
    return null;
  }

  getOtherUserSocketByMyUuid(myUuid) {
    const otherUser = this.getOtherUserByMyUuid(myUuid);
    if (otherUser) {
      return otherUser.socket;
    }
    return null;
  }

  setGameState(gameState) {
    this.gameState = gameState;
  }

  getGameState() {
    return this.gameState;
  }

  /**
   * 정수 비교 연산, 게임이 진행 중인지 확인
   * @returns true if Playing, false otherwise
   */
  isPlaying() {
    return this.gameState === gameStates.PLAYING;
  }

  // async sendCommand(redisUtilFunc) {
  //   if (this.gameState === gameStates.PLAYING) {
  //     await redisUtilFunc();
  //     return true;
  //   }
  //   return false;
  // }

  // sendEventToOtherUserByMyUuid(myUuid) {
  //   const otherUser = this.users.find((user) => user.uuid !== myUuid);
  //   if (otherUser) {
  //     return otherUser.socket.emit
  //   }
  // }

  // getUserSocketByUuid(uuid) {
  //   const index = this.uuids.findIndex((item) => item === uuid);
  //   if (index === -1) {
  //     return null;
  //   }
  //   return this.sockets[index];
  // }

  // getUserUuidBySocket(socket) {
  //   const index = this.sockets.findIndex((item) => item === socket);
  //   if (index === -1) {
  //     return null;
  //   }
  //   return this.uuids[index];
  // }

  removeUser(user) {
    const index = this.users.findIndex((item) => {
      if (item === user) {
        item.gameId = null;
        return true;
      }
      return false;
    });
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }

  removeUserByUuId(uuid) {
    const index = this.users.findIndex((user) => {
      if (user.uuid === uuid) {
        user.gameId = null;
        return true;
      }
      return false;
    });
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
}

export default Game;

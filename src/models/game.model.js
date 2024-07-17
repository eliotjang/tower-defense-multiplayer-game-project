import { gameStates } from '../constants/game.constants.js';
import { gameRedisFields } from '../constants/redis.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';
import User from './user.model.js';
import { removeUserGameData } from '../utils/data-remover.utils.js';
import packetTypes from '../constants/packet-types.constants.js';
import { getGameAssets } from '../init/assets.js';
import { findUserByUUID } from '../db/user/user.db.js';
import CustomError from '../utils/errors/customError.js';
import { ErrorCodes } from '../utils/errors/errorCodes.js';

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.gameState = gameStates.WAITING;
    this.users = [];
  }

  addUser(user) {
    const { game } = getGameAssets();
    const {
      numOfInitialTowers,
      userGold,
      baseHp,
      score,
      nextLevelInterval,
      levelUpScore,
      towerCost,
      monsterSpawnInterval,
      highScore,
    } = game.data;
    if (!(user instanceof User)) {
      throw new CustomError(ErrorCodes.SESSION_USER_NOT_FOUND, '추가할 유저 없음');
    }
    if (this.users.length >= 2) {
      return false;
    }
    this.users.push(user);
    user.socket.gameId = this.gameId;
    if (this.users.length == 2) {
      this.gameState = gameStates.PLAYING;
      const initData = this.initGameData(this.users);

      const payload = {
        score,
        gold: userGold,
        towerCost,
        baseHp,
        highScore, // highScore
        numOfInitialTowers,
        monsterSpawnInterval,
        nextLevelInterval,
        levelUpScore,
      };

      const temp = new Map();

      for (const user of this.users) {
        temp[user.uuid] = {
          monsterPath: initData[user.uuid].monsterPath,
          initialTowerCoords: initData[user.uuid].initialTowerCoords,
          basePosition: initData[user.uuid].basePosition,
        };
      }

      payload.data = temp;

      const notificationPacket = new NotificationPacket('대결을 시작합니다!', payload);
      const packet = serialize(packetTypes.MATCH_FOUND_NOTIFICATION, notificationPacket);

      this.users.forEach((user) => user.socket.emit('event', packet));
    }
    return true;
  }

  initGameData(users) {
    const { game } = getGameAssets();
    const { numOfInitialTowers, userGold, baseHp, score, canvasWidth, canvasHeight } = game.data;
    const data = {};
    for (const user of users) {
      // init
      const uuid = user.uuid;
      const monsterPath = generateRandomMonsterPath(canvasWidth, canvasHeight);
      const lastPoint = monsterPath[monsterPath.length - 1];
      const basePosition = { x: lastPoint.x, y: lastPoint.y };
      const gameData = {
        [gameRedisFields.BASE_HP]: baseHp,
        [gameRedisFields.GOLD]: userGold,
        [gameRedisFields.SCORE]: score,
        monsterPath: monsterPath,
        basePosition: basePosition,
        // [gameRedisFields.START_TIME]: ,
      };
      const initialTowerCoords = [];
      for (let i = 0; i < numOfInitialTowers; i++) {
        const { x, y } = getRandomPositionNearPath(200, monsterPath);
        initialTowerCoords.push({ x, y });
      }
      gameData.initialTowerCoords = initialTowerCoords;
      data[uuid] = gameData;
      Promise.all([gameRedis.setGameData(uuid, gameData)]).then();
    }
    return data;
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
    return otherUser?.socket;
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

  isEnding() {
    return this.gameState === gameStates.ENDING;
  }

  /**
   *
   * @param {User} user
   * @returns
   */
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
    // 유저의 게임 데이터 삭제 (redis)
    removeUserGameData(this.users.splice(index, 1)[0]);
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
    removeUserGameData(this.users.splice(index, 1)[0]);
    return true;
  }

  endGame() {
    for (const user of this.users) {
      removeUserGameData(user);
    }
  }
}

export default Game;

function generateRandomMonsterPath(canvasWidth, canvasHeight) {
  const path = [];
  let currentX = 0;
  let currentY = Math.floor(Math.random() * 21) + 500;

  path.push({ x: currentX, y: currentY });

  while (currentX < canvasWidth) {
    currentX += Math.floor(Math.random() * 100) + 50;
    if (currentX > canvasWidth) {
      currentX = canvasWidth;
    }

    currentY += Math.floor(Math.random() * 200) - 100;
    if (currentY < 0) {
      currentY = 0;
    }
    if (currentY > canvasHeight) {
      currentY = canvasHeight;
    }

    path.push({ x: currentX, y: currentY });
  }
  return path;
}

function getRandomPositionNearPath(maxDistance, monsterPath) {
  const segmentIndex = Math.floor(Math.random() * (monsterPath.length - 1));
  const startX = monsterPath[segmentIndex].x;
  const startY = monsterPath[segmentIndex].y;
  const endX = monsterPath[segmentIndex + 1].x;
  const endY = monsterPath[segmentIndex + 1].y;

  const t = Math.random();
  const posX = startX + t * (endX - startX);
  const posY = startY + t * (endY - startY);

  const offsetX = (Math.random() - 0.5) * 2 * maxDistance;
  const offsetY = (Math.random() - 0.5) * 2 * maxDistance;

  return {
    x: posX + offsetX,
    y: posY + offsetY,
  };
}

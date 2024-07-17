import redisClient from '../init/redis.js';
import {
  userRedisFields as urf,
  gameRedisFields as grf,
  isUserRedisField,
  isGameRedisField,
  gameRedisFields,
} from '../constants/redis.constants.js';
import { transformCase } from './transformCase.js';
import caseTypes from '../constants/case.constants.js';
import CustomError from './errors/customError.js';
import { ErrorCodes } from './errors/errorCodes.js';

const USER_PREFIX = 'user:';
const GAME_DATA_PREFIX = 'game:';
const TOWERS_PREFIX = 'towers:';

export const userRedis = {
  createUserData: async function (uuid, token) {
    try {
      const keyUUID = `${USER_PREFIX}${uuid}:${urf.UUID}`;
      const keyToken = `${USER_PREFIX}${uuid}:${urf.TOKEN}`;

      await redisClient.set(keyUUID, JSON.stringify(uuid));
      await redisClient.set(keyToken, JSON.stringify(token));
    } catch (error) {
      console.error('createUserData Error Message : ', error);
    }
  },
  /**
   *
   * @param {string} uuid
   * @param {Object} obj
   */
  setUserData: async function (uuid, obj) {
    try {
      for (const [key, value] of Object.entries(obj)) {
        const snakeKey = transformCase(key, caseTypes.SNAKE_CASE);
        if (isUserRedisField(snakeKey)) {
          const redisKey = `${USER_PREFIX}${uuid}:${snakeKey}`;
          await redisClient.set(redisKey, JSON.stringify(value));
        }
      }
    } catch (err) {
      console.error('setUserData failed:', err);
    }
  },
  getUserData: async function (uuid) {
    try {
      const pattern = `${USER_PREFIX}${uuid}*`;
      const keys = await redisClient.keys(pattern);

      const values = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i].replace(`${USER_PREFIX}${uuid}:`, '');
        values[key] = JSON.parse(await redisClient.get(keys[i]));
      }
      if (Object.keys(values).length === 0) {
        return null;
      }
      return values;
    } catch (error) {
      console.error('getUserData Error Message : ', error);
    }
  },

  getUserDataEx: async function (uuid, arr) {
    try {
      const userData = {};
      for (const keyName of arr) {
        const snakeKey = transformCase(keyName, caseTypes.SNAKE_CASE);
        if (isUserRedisField(snakeKey)) {
          const redisKey = `${USER_PREFIX}${uuid}:${snakeKey}`;
          const result = JSON.parse(await redisClient.get(redisKey));
          userData[transformCase(keyName, caseTypes.CAMEL_CASE)] = result;
        }
      }
      return userData;
    } catch (err) {
      console.error('getUserDataEx failed:', err);
    }
  },
  removeUserData: async function (uuid) {
    try {
      // TODO: 유저 정보 제거 작업
      const keys = await redisClient.keys(`${USER_PREFIX}${uuid}:*`);
      for (const key of keys) {
        await redisClient.del(key);
      }
    } catch (err) {
      console.error('removeUserData failed:', err);
    }
  },
};

export const gameRedis = {
  createGameData: async function (uuid, gold, baseHp) {
    try {
      const keyGold = `${GAME_DATA_PREFIX}${uuid}:${grf.GOLD}`;
      const keyBaseHp = `${GAME_DATA_PREFIX}${uuid}:${grf.BASE_HP}`;
      await redisClient.set(keyGold, `${gold}`);
      await redisClient.set(keyBaseHp, `${baseHp}`);
    } catch (error) {
      console.error('createGameData Error Message : ', error);
    }
  },
  setGameData: async function (uuid, obj) {
    try {
      for (const [key, value] of Object.entries(obj)) {
        const snakeKey = transformCase(key, caseTypes.SNAKE_CASE);
        if (isGameRedisField(snakeKey)) {
          const redisKey = `${GAME_DATA_PREFIX}${uuid}:${snakeKey}`;
          await redisClient.set(redisKey, JSON.stringify(value));
        }
      }
    } catch (err) {
      console.error('setUserData failed:', err);
    }
  },
  getGameData: async function (uuid) {
    try {
      const pattern = `${GAME_DATA_PREFIX}${uuid}:*`;
      const keys = await redisClient.keys(pattern);

      const values = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i].replace(`${GAME_DATA_PREFIX}${uuid}:`, '');
        values[key] = JSON.parse(await redisClient.get(keys[i]));
      }
      if (Object.keys(values).length === 0) {
        return null;
      }
      return values;
    } catch (error) {
      console.error('getGameData Error Message : ', error);
      return null;
    }
  },

  getUserDataEx: async function (uuid, arr) {
    try {
      const gameData = {};
      for (const keyName of arr) {
        const snakeKey = transformCase(keyName, caseTypes.SNAKE_CASE);
        if (isUserRedisField(snakeKey)) {
          const redisKey = `${GAME_DATA_PREFIX}${uuid}:${snakeKey}`;
          const result = JSON.parse(await redisClient.get(redisKey));
          gameData[transformCase(keyName, caseTypes.CAMEL_CASE)] = result;
        }
      }
      return gameData;
    } catch (err) {
      console.error('getUserDataEx failed:', err);
    }
  },

  patchGameDataGold: async function (uuid, byAmount) {
    try {
      if (typeof byAmount !== 'number') {
        throw new CustomError(ErrorCodes.GAME_REDIS_DATA_ERROR, 'byAmount 값 에러');
      }
      const key = `${GAME_DATA_PREFIX}${uuid}:${grf.GOLD}`;
      await redisClient.incrBy(key, byAmount);
    } catch (err) {
      console.error('patchGameDataGold failed:', err);
    }
  },

  patchGameDataBaseHp: async function (uuid, byAmount) {
    try {
      if (typeof byAmount !== 'number') {
        throw new CustomError(ErrorCodes.GAME_REDIS_DATA_ERROR, 'byAmount 값 에러');
      }
      const key = `${GAME_DATA_PREFIX}${uuid}:${grf.BASE_HP}`;
      return await redisClient.incrBy(key, byAmount);
    } catch (err) {
      console.error('patchGameDataBaseHp failed:', err);
    }
  },

  patchGameDataTower: async function (uuid, towerData, index) {
    try {
      const key = `${TOWERS_PREFIX}${uuid}:${index}`;
      const currentValue = await redisClient.get(key);
      const parsedValue = JSON.parse(currentValue);

      if (!parsedValue) {
        redisClient.set(key, JSON.stringify(towerData));
      }
    } catch (error) {
      console.error('patchGameDataTower Error Message : ', error);
    }
  },

  // tower index를 인자로 받아서 찾도록 변경 필요
  deleteGameDataTower: async function (uuid, towerData) {
    try {
      const pattern = `${TOWERS_PREFIX}${uuid}:*`;
      const keys = await redisClient.keys(pattern);

      for (let i = 0; i < keys.length; i++) {
        const value = JSON.parse(await redisClient.get(keys[i]));
        if (towerData.x === value.x && towerData.y === value.y) {
          await redisClient.del(keys[i]);
        }
      }
    } catch (error) {
      console.error('deleteGameDataTower Error Message : ', error);
    }
  },

  deleteGameDataTowerList: async function (uuid) {
    try {
      const pattern = `${TOWERS_PREFIX}${uuid}:*`;
      const keys = await redisClient.keys(pattern);

      for (let i = 0; i < keys.length; i++) {
        await redisClient.del(keys[i]);
      }
    } catch (error) {
      console.error('deleteGameDataTowerList Error Message : ', error);
    }
  },

  getGameDataTowerList: async function (uuid) {
    try {
      const pattern = `${TOWERS_PREFIX}${uuid}:*`;
      const keys = await redisClient.keys(pattern);

      const values = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i].replace(`${TOWERS_PREFIX}${uuid}:`, '');
        values[key] = JSON.parse(await redisClient.get(keys[i]));
      }
      return values;
    } catch (error) {
      console.error('getGameDataTowerList Error Message : ', error);
      return null;
    }
  },
  removeGameData: async function (uuid) {
    try {
      const keys = await redisClient.keys(`${GAME_DATA_PREFIX}${uuid}:*`);
      for (const key of keys) {
        await redisClient.del(key);
      }
    } catch (error) {
      console.error('removeGameData Error Message : ', error);
    }
  },
};

import redisClient from '../init/redis.js';

const USER_PREFIX = 'user:';
const USER_FIELD_UUID = 'uuid';
const USER_FIELD_TOKEN = 'token';
const GAME_DATA_PREFIX = 'game:';
const GAME_FIELD_GOLD = 'user_gold';
const GAME_FIELD_TOWER = 'tower_coordinates';
const GAME_FIELD_BASE_HP = 'base_hp';
const GAME_FIELD_START_TIME = 'start_time';
const TOWERS_PREFIX = 'towers:';

export const userRedis = {
  createUserData: async function (userId, uuid, token) {
    try {
      const keyUUID = `${USER_PREFIX}${userId}${USER_FIELD_UUID}`;
      const keyToken = `${USER_PREFIX}${userId}${USER_FIELD_TOKEN}`;

      await redisClient.set(keyUUID, JSON.stringify(uuid));
      await redisClient.set(keyToken, JSON.stringify(token));
    } catch (error) {
      console.error('createUserData Error Message : ', error);
    }
  },
  getUserData: async function (userId) {
    try {
      const pattern = `${USER_PREFIX}${userId}*`;
      const keys = await redisClient.keys(pattern);

      const values = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i].replace(`${USER_PREFIX}${userId}`, '');
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
};

export const gameRedis = {
  createGameData: async function (uuid, gold, baseHp) {
    try {
      const keyGold = `${GAME_DATA_PREFIX}${uuid}${GAME_FIELD_GOLD}`;
      const keyBaseHp = `${GAME_DATA_PREFIX}${uuid}${GAME_FIELD_BASE_HP}`;
      await redisClient.set(keyGold, `${gold}`);
      await redisClient.set(keyBaseHp, `${baseHp}`);
    } catch (error) {
      console.error('createGameData Error Message : ', error);
    }
  },

  getGameData: async function (uuid) {
    try {
      const pattern = `${GAME_DATA_PREFIX}${uuid}*`;
      const keys = await redisClient.keys(pattern);

      const values = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i].replace(`${GAME_DATA_PREFIX}${uuid}`, '');
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

  deleteGameDataTower: async function (uuid, towerData) {
    try {
      const pattern = `${TOWERS_PREFIX}${uuid}*`;
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
      const pattern = `${TOWERS_PREFIX}${uuid}*`;
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
      const pattern = `${TOWERS_PREFIX}${uuid}*`;
      const keys = await redisClient.keys(pattern);

      const values = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i].replace(`${TOWERS_PREFIX}${uuid}`, '');
        values[key] = JSON.parse(await redisClient.get(keys[i]));
      }
      return values;
    } catch (error) {
      console.error('getGameDataTowerList Error Message : ', error);
      return null;
    }
  },

  patchGameDataGold: async function (uuid, newGold) {
    try {
      const key = `${GAME_DATA_PREFIX}${uuid}`;

      const gameData = await this.getGameData();
      if (!gameData) {
        throw new Error('해당 유저의 게임 데이터가 존재하지 않습니다');
      }
      redisClient.hSet(key, GAME_FIELD_GOLD, JSON.stringify(newGold));
    } catch (error) {
      console.error('patchGameDataGold Error Message : ', error);
    }
  },

  removeGameData: async function (uuid) {
    try {
      await redisClient.del(`${GAME_DATA_PREFIX}${uuid}`);
    } catch (error) {
      console.error('removeGameData Error Message : ', error);
    }
  },
};

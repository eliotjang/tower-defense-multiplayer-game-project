import redisClient from '../init/redis.js';

export const towers = {};

export const addTower = (uuid, tower) => {
  if (!towers[uuid]) {
    towers[uuid] = [];
  }
  towers[uuid].push(tower);
};
export const redisAddTower = async (uuid, towerData, index) => {
  await redisClient.set(`towers:${uuid}:${index}`, JSON.stringify(towerData), (err, reply) => {
    if (err) {
      console.log('Redis Set과정 중 오류 발생');
    } else {
      console.log('reply:', reply);
    }
  });
};

export const towerRedis = {
  createTowerData: async function (uuid, towerData, index) {
    try {
      const keyTowerData = `towers:${uuid}:${index}`;
      await redisClient.set(keyTowerData, JSON.stringify(towerData));
    } catch (error) {
      console.error('createTowerData Error Message : ', error);
    }
  },
};

// 유저의 타워 목록을 가져오는 함수
export const getUserTowers = (uuid) => {
  return towers[uuid] || [];
};

export const getRedisUserTowers = (uuid) => {};

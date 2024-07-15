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

// 유저의 타워 목록을 가져오는 함수
export const getUserTowers = (uuid) => {
  return towers[uuid] || [];
};

export const getRedisUserTowers = (uuid) => {
  };

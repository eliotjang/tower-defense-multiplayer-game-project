export const userRedisFields = {
  UUID: 'uuid',
  TOKEN: 'token',
};

export const gameRedisFields = {
  GOLD: 'user_gold',
  TOWER: 'tower_coordinates',
  BASE_HP: 'base_hp',
  SCORE: 'score',
  START_TIME: 'start_time',
};

const userRedisFieldsArray = Object.values(userRedisFields);
const gameRedisFieldsArray = Object.values(gameRedisFields);

export const isUserRedisField = (fieldName) => {
  return userRedisFieldsArray.includes(fieldName);
};

export const isGameRedisField = (fieldName) => {
  return gameRedisFieldsArray.includes(fieldName);
};

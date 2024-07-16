import User from '../models/user.model.js';
import { gameRedis } from './redis.utils.js';

/**
 *
 * @param {User} user
 */
export const removeUserGameData = (user) => {
  // 유저의 게임 데이터 삭제 (redis)
  Promise.all([gameRedis.removeGameData(user.uuid), gameRedis.deleteGameDataTowerList(user.uuid)]);
};

import { gameRedis } from '../utils/redis.utils.js';

export const towerAttackRequestHandler = async (socket, uuid, packetType, payload, io) => {
  // console.log('towerAttackRequestHandler');
  const { timestamp } = payload;
};

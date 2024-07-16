import configs from '../config/configs.js';
import redis from 'redis';

// connect Redis
const redisClient = redis.createClient({
  url: `redis://${configs.env.redisUsername}:${configs.env.redisPassword}@${configs.env.redisHost}:${configs.env.redisPort}/0`,
});
redisClient.on('connect', () => {
  console.info('Redis connected!');
});
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)

export default redisClient;

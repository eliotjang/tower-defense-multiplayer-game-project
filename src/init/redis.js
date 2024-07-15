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
/* const redisCli = redisClient.v4; // 기존은 콜백 기반이고, v4 버전은 Promise 기반

let bool = await redisCli.set('key', '123'); // OK
let data = await redisCli.get('key'); // 123
console.log(data); */

export default redisClient;

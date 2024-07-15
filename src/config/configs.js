import constants from '../constants/constants.js';
import env from '../constants/env.constants.js';

const configs = {
  env: {
    serverHost: env.SERVER_HOST,
    serverPort: env.SERVER_PORT,
    redisHost: env.REDIS_HOST,
    redisPort: env.REDIS_PORT,
    redisUsername: env.REDIS_USERNAME,
    redisPassword: env.REDIS_PASSWORD,
    jwtSecret: env.JWT_SECRET,
  },
  client: {
    clientVersion: '1.0.0',
    index: constants.INDEX_PATH,
  },
  server: {},
  databases: {
    GAME_DB: {
      name: env.DB1_NAME,
      user: env.DB1_USER,
      password: env.DB1_PASSWORD,
      host: env.DB1_HOST,
      port: env.DB1_PORT,
    },
    USER_DB: {
      name: env.DB2_NAME,
      user: env.DB2_USER,
      password: env.DB2_PASSWORD,
      host: env.DB2_HOST,
      port: env.DB2_PORT,
    },
  },
};
export default configs;

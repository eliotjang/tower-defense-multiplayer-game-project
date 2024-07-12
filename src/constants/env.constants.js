import dotEnv from 'dotenv';

dotEnv.config();

const envConstants = {
  JWT_SECRET: process.env.JWT_SECRET,
  SERVER_HOST: process.env.SERVER_HOST || '127.0.0.1',
  SERVER_PORT: process.env.SERVER_PORT || 5555,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};

export default envConstants;

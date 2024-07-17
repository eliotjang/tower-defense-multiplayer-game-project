import dotEnv from 'dotenv';

dotEnv.config();

const envConstants = {
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: +process.env.SALT_ROUNDS,
  SERVER_HOST: process.env.SERVER_HOST || '13.209.73.219',
  SERVER_PORT: +process.env.SERVER_PORT || 5555,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: +process.env.REDIS_PORT || 6379,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  DB1_NAME: process.env.DB1_NAME || 'database1',
  DB1_USER: process.env.DB1_USER || 'user1',
  DB1_PASSWORD: process.env.DB1_PASSWORD || 'password1',
  DB1_HOST: process.env.DB1_HOST || 'localhost',
  DB1_PORT: +process.env.DB1_PORT || 3306,

  DB2_NAME: process.env.DB2_NAME || 'database2',
  DB2_USER: process.env.DB2_USER || 'user2',
  DB2_PASSWORD: process.env.DB2_PASSWORD || 'password2',
  DB2_HOST: process.env.DB2_HOST || 'localhost',
  DB2_PORT: +process.env.DB2_PORT || 3306,
};

export default envConstants;

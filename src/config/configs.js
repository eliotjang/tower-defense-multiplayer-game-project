import env from "../constants/env.constants.js";

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
    clientVersion: "1.0.0",
  },
  server: {},
};

export default configs;

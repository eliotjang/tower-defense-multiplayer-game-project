import { handleConnection, handleDisconnect, handleEvent } from './helper.js';
import configs from '../utils/configs.js';
import jwt from 'jsonwebtoken';
import redisClient from '../init/redis.js';
import { handleError } from './error.handler.js';
import CustomError from '../utils/errors/classes/custom.error.js';

const registerHandler = (io) => {
  io.on('connection', async (socket) => {
    // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳
    try {
      // 모든 서비스 이벤트 처리
      socket.on('event', (data) => {
        if (data?.timeStamp) {
          const timeStamp = Date.now();
          const tolerance = 1000;
          const diff = timeStamp - data.timeStamp;
          if (diff > tolerance) {
            throw new CustomError('Timestamp 검증 실패');
          }
        }

        // handleEvent(io, socket, data);
      });

      // 접속 해제시 이벤트 처리
      socket.on('disconnect', () => handleDisconnect(socket, sanitizedUUID));
    } catch (err) {
      await handleError(err, socket);
    }
  });
};

export default registerHandler;

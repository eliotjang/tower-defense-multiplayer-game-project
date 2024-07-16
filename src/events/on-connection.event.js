import { verifyToken } from '../auth/auth.js';
import { createUser, findUserByUserId, findUserByUUID, updateUserLogin } from '../db/user/user.db.js';
import { handleConnection } from '../handlers/helper.js';
import { userRedis } from '../utils/redis.utils.js';
import onData from './on-data.event.js';
import { v4 as uuidv4 } from 'uuid';

const onConnection = (io) => async (socket) => {
  console.log('onConnection'); // 디버깅 콘솔 로그
  // console.log(socket.handshake.auth.userId);
  // jwt verify

  //handleConnection(socket, userDB.uuid);
  // if (socket.handshake.auth?.token) {
  //   try {
  //     verifyToken(socket.handshake.auth.token);
  //     socket.
  //   }
  //   catch(err) {

  //   }

  // }

  socket.on('event', onData(io, socket)); // , userDB.uuid));
  // socket.on('disconnect', onDisconnect(socket));
};

export default onConnection;

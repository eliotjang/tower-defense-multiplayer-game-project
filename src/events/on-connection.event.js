import { createUser, findUserByUserId, findUserByUUID, updateUserLogin } from '../db/user/user.db.js';
import { handleConnection } from '../handlers/helper.js';
import { userRedis } from '../utils/redis.utils.js';
import onData from './on-data.event.js';
import onDisconnect from './on-disconnect.event.js';
import jwt from 'jsonwebtoken';
import config from '../config/configs.js';
import { addPlayers, findUserByUserName, getPlayers } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';

const onConnection = (io) => async (socket) => {
  console.log('onConnection'); // 디버깅 콘솔 로그
  // console.log(socket.handshake.auth.userId);
  // jwt verify

  // handleConnection(socket, userDB.uuid);

  socket.on('event', onData(io, socket)); // , userDB.uuid));
  // socket.on('disconnect', onDisconnect(socket));
};

export default onConnection;

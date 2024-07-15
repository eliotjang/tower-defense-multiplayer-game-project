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
  try {
    // jwt verify
    const token = socket.handshake.auth.token;
    const decodedToken = jwt.verify(token, config.env.jwtSecret);
    const username = decodedToken.username;
    console.log(username);
    const user = await findUserByUserName(username); //session 사용중 redis 추가시 수정

    if (!user) {
      throw new Error('토큰 사용자가 존재하지 않습니다.');
    }
    // 아이디 임의 생성
    const password = '1234';
    const userId = uuidv4();
    const uuid = uuidv4();

    let userDB = await findUserByUserId(userId);
    if (!userDB) {
      userDB = await createUser(userId, password);
      console.log('새로운 유저가 DB에 등록되었습니다.');
    } else {
      await updateUserLogin(userDB.userId);
      console.log('기존 유저 정보를 불러옵니다.');
    }

    // console.log(socket);
    let userRD = await userRedis.getUserData(userId);
    if (!userRD) {
      console.log('새로운 Redis 데이터 생성');
      await userRedis.createUserData(userId, uuid, token);
      userRD = await userRedis.getUserData(userId);
    }

    console.log(userRD);

    handleConnection(socket, userDB.uuid);

    const socketId = socket.id;
    const player = { username: user.username, uuid: user.uuid, token: token, socketId: socketId };
    addPlayers(player); //session 사용중 redis 추가시 수정

    const id = user.username;
    handleConnection(socket, id);
    socket.on('event', onData(io, socket));
    socket.on('disconnect', onDisconnect(socket));
  } catch (err) {
    //await handleError(err,socket)

    // 토큰이 만료되었거나, 조작되었을 때, 에러 메시지를 다르게 출력합니다.
    switch (err.name) {
      case 'TokenExpiredError':
        return console.error({ message: '토큰이 만료되었습니다.' });
      case 'JsonWebTokenError':
        return console.error({ message: '토큰이 조작되었습니다.' });
      default:
        return console.error({ message: err.message ?? '비정상적인 요청입니다.' });
    }
  }
};

export default onConnection;

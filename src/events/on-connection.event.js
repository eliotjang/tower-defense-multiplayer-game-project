import { handleConnection } from '../handlers/helper.js';
import onData from './on-data.event.js';
import jwt from 'jsonwebtoken';
import config from '../config/configs.js';
import { addPlayers, findUserByUserName, getPlayers } from '../models/user.model.js';

const onConnection = (io) => async (socket) => {
  try {
    // jwt verify
    const token = localStorage.getItem('token');
    const decodedToken = jwt.verify(token, config.env.jwtSecret);
    const username = decodedToken.username;

    const user = await findUserByUserName(username); //session 사용중 redis 추가시 수정

    if (!user) {
      res.clearCookie('authorization');
      throw new Error('토큰 사용자가 존재하지 않습니다.');
    }

    const socketId = socket.id;
    const player = { username: user.username, uuid: user.uuid, token: token, socketId: socketId };
    addPlayers(player); //session 사용중 redis 추가시 수정

    const id = user.uuid;
    handleConnection(socket, id);
    socket.on('event', onData(io, socket));
    socket.on('disconnect', onDisconnect(socket));
  } catch (err) {
    //await handleError(err,socket)

    window.localStorage.removeItem('token');

    // 토큰이 만료되었거나, 조작되었을 때, 에러 메시지를 다르게 출력합니다.
    switch (err.name) {
      case 'TokenExpiredError':
        return res.status(401).json({ message: '토큰이 만료되었습니다.' });
      case 'JsonWebTokenError':
        return res.status(401).json({ message: '토큰이 조작되었습니다.' });
      default:
        return res.status(401).json({ message: error.message ?? '비정상적인 요청입니다.' });
    }
  }
};

export default onConnection;

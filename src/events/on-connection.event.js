import { handleConnection } from '../handlers/helper.js';
import onData from './on-data.event.js';
import { v4 as uuidv4 } from 'uuid';

const onConnection = (io) => async (socket) => {
  console.log('onConnection'); // 디버깅 콘솔 로그
  // jwt verify

  // 아이디 임의 생성
  const id = uuidv4();
  handleConnection(socket, id);

  socket.on('event', onData(io, socket));
  // socket.on('disconnect', onDisconnect(socket));
};

export default onConnection;

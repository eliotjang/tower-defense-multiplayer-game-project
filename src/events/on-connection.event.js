import onData from './on-data.event.js';
import { v4 as uuidv4 } from 'uuid';

const onConnection = async (socket) => {
  console.log('onConnection');
  // jwt verify

  // handleConnection(socket);

  socket.on('data', onData(socket));
  // socket.on('disconnect', onDisconnect(socket));
  //
};

export default onConnection;

import onData from './on-data.event.js';

const onConnection = (io) => async (socket) => {
  console.log('onConnection'); // 디버깅 콘솔 로그

  socket.on('event', onData(io, socket)); // , userDB.uuid));

};

export default onConnection;

import packetTypes from '../constants/packet-types.constants.js';
import Game from '../game.js';
import Socket from '../socket.js';

const loadGame = (loginNumber) => {
  const socket = Socket.getInstance();
  if (!socket) {
    console.error('game-loader.js: 소켓이 없습니다.');
  } else {
    const game = new Game(socket);
    game.userId = sessionStorage.getItem('userId');
    localStorage.setItem('token', `token${loginNumber ? loginNumber : ''}`);

    const packet = { timestamp: Date.now() };
    Socket.sendEventProto(packetTypes.MATCH_REQUEST, packet);
  }
};

export default loadGame;

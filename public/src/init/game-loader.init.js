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

    const packet = { timestamp: Date.now(), userId: game.userId };
    Socket.sendEventProto(packetTypes.MATCH_REQUEST, packet, `token${loginNumber ? loginNumber : ''}`);
    // Game.getInstance().socket.sendEventProto(
    //   packetTypes.MATCH_REQUEST,
    //   packet,
    //   `token${loginNumber ? loginNumber : ''}`
    // );
  }
};

export default loadGame;

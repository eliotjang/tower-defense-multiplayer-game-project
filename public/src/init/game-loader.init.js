import packetTypes from '../constants/packet-types.constants.js';
import Game from '../classes/game.class.js';
import Socket from '../socket.js';

const loadGame = (loginNumber) => {
  const socket = Socket.getInstance();
  if (!socket) {
    console.error('game-loader.js: 소켓이 없습니다.');
  } else {
    new Game(socket);
    const packet = { timestamp: Date.now(), userId: Game.getInstance().userId };
    Game.getInstance().socket.sendEventProto(
      packetTypes.MATCH_REQUEST,
      packet,
      `token${loginNumber ? loginNumber : ''}`
    );
  }
};

export default loadGame;

import packetTypes from '../constants/packet-types.constants.js';
import Game from '../game.js';
import Socket from '../socket.js';

function stateSyncLoop() {
  const game = Game.getInstance();
  setTimeout(() => {
    Socket.sendEventProto(packetTypes.STATE_SYNC_REQUEST, { timestamp: Date.now() });
    stateSyncLoop();
  }, game.nextLevelInterval);
}

export default stateSyncLoop;

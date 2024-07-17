import Game from '../game.js';

const stateSyncResponseHandler = ({ socket, packetType, payload }) => {
  const { levelUpScore } = payload;
  const game = Game.getInstance();
  game.score += levelUpScore;
  game.monsterLevel++;
};

export default stateSyncResponseHandler;

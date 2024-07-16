import Game from '../game.js';

const monsterKillNotificationHandler = ({ socket, packetType, payload }) => {
  const { monsterIndex } = payload;

  const game = Game.getInstance();
  game.opponentMonsters.splice(monsterIndex, 1);
};

export default monsterKillNotificationHandler;

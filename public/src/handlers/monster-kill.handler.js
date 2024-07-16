import Game from '../game.js';

const monsterKillNotificationHandler = ({ socket, packetType, payload }) => {
  const { monsterIndex } = payload;

  const game = Game.getInstance();
  const targetIndex = game.opponentMonsters.findIndex((monster) => {
    return monsterIndex === monster.index;
  });
  game.opponentMonsters.splice(targetIndex, 1);
};

export default monsterKillNotificationHandler;

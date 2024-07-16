import Game from '../game.js';

const towerAttackNotificationHandler = ({ socket, packetType, payload }) => {
  // console.log('towerAttackNotificationHandler');
  const { towerIndex, monsterIndex } = payload;

  const game = Game.getInstance();

  game.targetTowerIndex = towerIndex;
  game.targetMonsterIndex = monsterIndex;
};

export default towerAttackNotificationHandler;

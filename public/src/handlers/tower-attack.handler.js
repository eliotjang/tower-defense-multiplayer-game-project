import Game from '../game.js';

const towerAttackNotificationHandler = ({ socket, packetType, payload }) => {
  // console.log('towerAttackNotificationHandler');
  const { towerIndex, monsterIndex } = payload;

  const game = Game.getInstance();

  // game.opponentTowers.forEach((tower) => {
  //   if (tower.index === towerIndex) {
  //     game.monsters.forEach((monster) => {
  //       if (monster.index === monsterIndex) {
  //         const distance = Math.sqrt(Math.pow(tower.x - monster.x, 2) + Math.pow(tower.y - monster.y, 2));
  //         if (distance < tower.range) {
  //           tower.attack(monster);
  //         }
  //       }
  //     });
  //   }
  // });

  // console.log(towerIndex, monsterIndex);
};

export default towerAttackNotificationHandler;

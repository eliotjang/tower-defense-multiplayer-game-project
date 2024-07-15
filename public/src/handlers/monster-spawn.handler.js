import Game from '../game.js';
import { Monster } from '../monster.js';

const monsterSpawnNotificationHandler = ({ socket, packetType, payload }) => {
  // console.log('monsterSpawnNotificationHandler');
  const { monsterNumber } = payload;

  const game = Game.getInstance();
  const newOpponentMonster = new Monster(game.opponentMonsterPath, game.monsterImages, game.monsterLevel);
  game.opponentMonsters.push(newOpponentMonster);
};

export default monsterSpawnNotificationHandler;

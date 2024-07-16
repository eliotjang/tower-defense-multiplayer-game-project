import Game from '../game.js';
import { Tower } from '../tower.js';

export const towerResponseHandler = (data) => {
  const { newUserGold, x, y } = data.payload;
  const game = Game.getInstance();

  const tower = new Tower(x, y, game.towerCost, game.myTowerIndex++);
  game.userGold = newUserGold;
  game.towers.push(tower);
  tower.draw(game.ctx, game.towerImage);
};

export const towerNotificationHandler = (data) => {
  const { x, y } = data.payload;
  const game = Game.getInstance();

  const tower = new Tower(x, y, game.towerCost, game.opponentTowerIndex++);

  game.opponentTowers.push(tower);
  tower.draw(game.opponentCtx, game.towerImage);
};

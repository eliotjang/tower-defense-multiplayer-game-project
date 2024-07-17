import Game from '../game.js';

export const monsterKillNotificationHandler = ({ socket, packetType, payload }) => {
  const { monsterIndex } = payload;

  const game = Game.getInstance();
  const targetIndex = game.opponentMonsters.findIndex((monster) => {
    return monsterIndex === monster.index;
  });
  game.opponentMonsters.splice(targetIndex, 1);
};

export const monsterKillResponseHandler = ({ socket, packetType, payload }) => {
  const { userGold } = payload;

  const game = Game.getInstance();
  game.userGold = userGold;
};

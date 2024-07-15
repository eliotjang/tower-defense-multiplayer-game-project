import Game from '../game.js';

const baseHandler = ({ socket, packetType, payload }) => {
  const { isOpponent, baseHp } = payload;
  const game = Game.getInstance();
  game[isOpponent ? 'opponentBase' : 'base'].hp = baseHp; // 적 베이스 아직 없음
};

export default baseHandler;

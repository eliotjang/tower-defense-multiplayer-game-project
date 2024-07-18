import packetTypes from '../constants/packet-types.constants.js';
import Game from '../game.js';
import { displayModalMessage } from '../modals/modal.js';
import RequestPacket from '../protobuf/classes/request.proto.js';
import Socket from '../socket.js';

const winSound = new Audio('sounds/win.wav');
const loseSound = new Audio('sounds/lose.wav');
winSound.volume = 0.1;
loseSound.volume = 0.1;

const gameOverHandler = ({ socket, packetType, payload }) => {
  const { isWin, baseHp } = payload;
  const game = Game.getInstance();

  // 파괴 기지 최종 체력 갱신
  if (isWin) {
    game.opponentBase.hp = baseHp;
    game.opponentBase.draw(game.opponentCtx, game.baseImage);
  } else {
    game.base.hp = baseHp;
    game.base.draw(game.ctx, game.baseImage);
  }

  // 게임 정지
  game.end();

  // 결과 출력
  if (isWin) {
    winSound.play().then(() => {
      displayModalMessage('축하드립니다!. 게임에서 승리했습니다!');
    });
  } else {
    loseSound.play().then(() => {
      displayModalMessage('아쉽습니다. 게임에서 패배했습니다..');
    });
  }

  // 게임 종료 패킷 전송
  if (isWin) {
    Socket.sendEventProto(packetTypes.GAME_END_REQUEST, { timestamp: Date.now() });
  }
};

export default gameOverHandler;

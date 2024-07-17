import packetTypes from '../constants/packet-types.constants.js';
import Game from '../game.js';
import RequestPacket from '../protobuf/classes/request.proto.js';
import Socket from '../socket.js';

const gameOverHandler = ({ socket, packetType, payload }) => {
  // 게임 정지
  const game = Game.getInstance();
  game.pause();

  // 결과 출력
  const { isWin } = payload;
  const winSound = new Audio('sounds/win.wav');
  const loseSound = new Audio('sounds/lose.wav');
  winSound.volume = 0.1;
  loseSound.volume = 0.1;
  const modal = document.getElementById('modalContainer');
  const modalMessage = document.querySelector('.modalMessage');
  if (isWin) {
    winSound.play().then(() => {
      modalMessage.innerHTML = '축하드립니다!. 게임에서 승리했습니다!';
      modal.classList.remove('hidden');
    });
  } else {
    loseSound.play().then(() => {
      modalMessage.innerHTML = '아쉽습니다. 게임에서 패배했습니다..';
      modal.classList.remove('hidden');
    });
  }

  // 게임 종료 패킷 전송
  const gameEndPacket = new RequestPacket('token', null, { timestamp: Date.now() });

  Socket.sendEventProto(packetTypes.GAME_END_REQUEST, gameEndPacket);
};

export default gameOverHandler;

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
  winSound.volume = 0.3;
  loseSound.volume = 0.3;
  if (isWin) {
    winSound.play().then(() => {
      alert('당신이 게임에서 승리했습니다!');
    });
  } else {
    loseSound.play().then(() => {
      alert('아쉽지만 대결에서 패배하셨습니다! 다음 대결에서는 꼭 이기세요!');
    });
  }

  // 게임 종료 패킷 전송
  const gameEndPacket = new RequestPacket('token', null, { timestamp: Date.now() });

  Socket.sendEventProto(packetTypes.GAME_END_REQUEST, gameEndPacket);
};

export default gameOverHandler;

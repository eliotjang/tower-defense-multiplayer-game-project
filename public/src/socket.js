import onEvent from './events/on-event.event.js';
import Game from './game.js';
import { serialize } from './utils/packet-serializer.js';

class Socket {
  constructor(url) {
    if (Socket.instance) {
      return Socket.instance;
    }
    this.connect(url);

    Socket.instance = this;
  }

  /**
   *
   * @returns {Socket} singleton instance
   */
  static getInstance() {
    return Socket.instance;
  }

  connect(url) {
    this.socket = io(url);

    this.socket.on('connection', (data) => {
      // const token = window.localStorage.getItem('token');
      // if(token){
      // }
      // console.log('data.uuid : ', data.uuid);
      // const game = new Game(this.socket);
      // game.userId = data.uuid;
    });
    this.socket.on('event', onEvent(this.socket));
    this.socket.on('error', () => {});
  }

  addEvent(eventName, callback) {
    this.socket.on(eventName, callback);
  }

  sendEvent(packetType, payload) {
    // 토큰과 클라이언트 버전 임의 생성
    socket.emit('event', {
      packetType,
      token: 'token',
      clientVersion: '1.0.0',
      payload,
    });
  }

  static sendEventProto(packetType, payload) {
    // 프로토콜 버퍼 적용된 sendEvent
    const requestData = {
      token: 'token',
      clientVersion: '1.0.0',
      payload,
    };

    const packet = serialize(packetType, requestData);

    Socket.getInstance().socket.emit('event', packet);
  }

  sendEventProto(packetType, payload) {
    // 프로토콜 버퍼 적용된 sendEvent
    const requestData = {
      token: 'token',
      clientVersion: '1.0.0',
      payload,
    };

    const packet = serialize(packetType, requestData);

    this.socket.emit('event', packet);
  }
}

export default Socket;

// export let socket, userId;

// const sendEvent = (packetType, payload) => {
//   // 토큰과 클라이언트 버전 임의 생성
//   socket.emit('event', {
//     packetType,
//     token: 'token',
//     clientVersion: '1.0.0',
//     payload,
//   });
// };

// const sendEventProto = (packetType, payload) => {
//   // 소켓 없으면 에러
//   if (!socket) {
//     console.error('multi_game.js: 소켓이 없습니다.');
//     return;
//   }

//   // 프로토콜 버퍼 적용된 sendEvent
//   const requestData = {
//     token: 'token',
//     clientVersion: '1.0.0',
//     payload,
//   };

//   const packet = serialize(packetType, requestData, true);

//   socket.emit('event', packet);
// };

// function initSocket(userId, password) {
//   socket = io('http://127.0.0.1:5555', {
//     auth: {
//       // token: localStorage.getItem('token'),
//       // userId,
//       // password,
//     },
//   });

//   socket.on('connect_error', (err) => {
//     if (err.message === 'Authentication error') {
//       alert('잘못된 토큰입니다.');
//       location.href = '/login';
//     }
//   });

//   // game.userId = userId; // 흠

//   //
//   socket.on('connection', (data) => {
//     console.log('서버 연결 완료:', data);
//     // 연결 완료되면 토큰 저장

//     // userId = data.uuid;
//   });

//   // 패킷 타입을 확인하여 해당 핸들러에서 처리
//   socket.on('event', onEvent(socket));

//   socket.on('matchFound', (data) => {
//   console.log('matchFound');
//   // 상대가 매치되면 3초 뒤 게임 시작
//   progressBarMessage.textContent = '게임이 3초 뒤에 시작됩니다.';
//   userData.baseHp = 200;
//   for (const key in data.payload) {
//     if (key === userId) {
//       userData.basePosition = data.payload[key].basePosition;
//       userData.initialTowerCoords = data.payload[key].initialTowerCoords;
//       userData.monsterPath = data.payload[key].monsterPath;
//       continue;
//     } else {
//       opponentData.opponentBasePosition = data.payload[key].basePosition;
//       opponentData.opponentInitialTowerCoords = data.payload[key].initialTowerCoords;
//       opponentData.opponentMonsterPath = data.payload[key].monsterPath;
//     }
//   }
//   // console.log(monsterPath);
//   // console.log(opponentMonsterPath);
//   let progressValue = 0;
//   const progressInterval = setInterval(() => {
//     progressValue += 10;
//     progressBar.value = progressValue;
//     progressBar.style.display = 'block';
//     loader.style.display = 'none';
//     if (progressValue >= 100) {
//       clearInterval(progressInterval);
//       progressBarContainer.style.display = 'none';
//       progressBar.style.display = 'none';
//       buyTowerButton.style.display = 'block';
//       canvas.style.display = 'block';
//       opponentCanvas.style.display = 'block';
//       // TODO. 유저 및 상대방 유저 데이터 초기화
//       if (!isInitGame) {
//         initGame();
//       }
//     }
//   }, 300);
//   });

//     socket.on('gameOver', (data) => {
//       bgm.pause();
//       const { isWin } = data;
//       const winSound = new Audio('sounds/win.wav');
//       const loseSound = new Audio('sounds/lose.wav');
//       winSound.volume = 0.3;
//       loseSound.volume = 0.3;
//       if (isWin) {
//         winSound.play().then(() => {
//           alert('당신이 게임에서 승리했습니다!');
//           // TODO. 게임 종료 이벤트 전송
//           location.reload();
//         });
//       } else {
//         loseSound.play().then(() => {
//           alert('아쉽지만 대결에서 패배하셨습니다! 다음 대결에서는 꼭 이기세요!');
//           // TODO. 게임 종료 이벤트 전송
//           location.reload();
//         });
//       }
//     });
// }

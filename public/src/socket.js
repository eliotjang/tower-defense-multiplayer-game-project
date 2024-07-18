import onEvent from './events/on-event.event.js';
import { serialize } from './utils/packet-serializer.js';
import { getToken } from './auth/token.auth.js';
import RequestPacket from './protobuf/classes/request.proto.js';
import { CLIENT_VERSION } from './constants/constants.js';
import { showMatchButton } from './utils/toggler.utils.js';
import { displayModalMessage } from './modals/modal.js';
import loadGame from './init/game-loader.init.js';

class Socket {
  constructor(url) {
    if (Socket.instance) {
      return Socket.instance;
    }

    this.connect(url);
    Socket.instance = this;
  }

  static getInstance() {
    return Socket.instance;
  }

  connect(url) {
    this.socket = io(url, {
      auth: { token: getToken() },
    });
    this.socket.on('connection', (data) => {
      const { verified } = data;
      // displayModalMessage('재접속 성공');
      if (verified) {
        showMatchButton();
      }
    });
    this.socket.on('event', onEvent(this.socket));
  }

  static sendEventProto(packetType, payload) {
    // 프로토콜 버퍼 적용된 sendEvent
    const requestData = new RequestPacket(getToken(), CLIENT_VERSION, payload);
    const packet = serialize(packetType, requestData);
    Socket.getInstance().socket.emit('event', packet);
  }

  sendEventProto(packetType, payload) {
    // 프로토콜 버퍼 적용된 sendEvent
    const requestData = {
      token: getToken(),
      clientVersion: '1.0.0',
      payload,
    };

    const packet = serialize(packetType, requestData);

    this.socket.emit('event', packet);
  }

  sendEvent(packetType, payload) {
    // 토큰과 클라이언트 버전 임의 생성
    socket.emit('event', {
      packetType,
      token: getToken(),
      clientVersion: '1.0.0',
      payload,
    });
  }

  addEvent(eventName, callback) {
    this.socket.on(eventName, callback);
  }
}

export default Socket;

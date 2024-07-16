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
    this.socket = io(url, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    this.socket.on('connection', (data) => {
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
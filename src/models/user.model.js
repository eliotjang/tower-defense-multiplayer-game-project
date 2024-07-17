// 서버 메모리에 유저의 세션(소켓ID)을 저장
// 이때 유저는 객체 형태로 저장
// { uuid: string; socketId: string };

import packetTypes from '../constants/packet-types.constants.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { serialize } from '../utils/packet-serializer.utils.js';

// const users = [];

class User {
  constructor(uuid, socket) {
    this.uuid = uuid;
    this.socket = socket;
    this.gameId = null;
  }

  async ping() {
    try {
      const packet = new ResponsePacket(0, 'Ping', { timestamp: Date.now() });
      const serialized = serialize(packetTypes.PING_RESPONSE, packet);
      this.socket.emit('event', serialized);
    } catch (err) {
      console.error(`[${this.uuid}] Ping 실패`);
    }
  }

  async pong(data) {
    try {
      const diff = Date.now() - data.timestamp;
      if (typeof diff !== 'number') {
        throw new Error('timestamp가 잘 못 되었습니다.');
      }
      console.log(`[${this.uuid}] Pong: ${diff / 1000}s`);
    } catch (err) {
      console.error(`[${this.uuid}] Pong 실패`);
    }
  }
}

export default User;

// export const addUser = async (user) => {
//   users.push(user);
// };

// // 유저 삭제
// export const removeUser = async (uuid) => {
//   const index = users.findIndex((user) => user.socketId === uuid);
//   if (index !== -1) {
//     return users.splice(index, 1)[0];
//   }
// };

// // 유저 조회
// export const findUser = async (uuid) => {
//   const index = users.findIndex((user) => user.socketId === uuid);
//   if (index != -1) {
//     return users[index];
//   }
// };

// // 전체 유저 조회
// export const getUsers = async () => {
//   return users;
// };

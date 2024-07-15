// import packetTypes from '../constants/packet-types.constants.js';
// import { serialize } from '../utils/packet-serializer.utils';
// import NotificationPacket from './../protobuf/classes/notification/notification.proto';

import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';

// 사용자 데이터를 담을 배열
let userPrivacyId = [];
let userPrivacyData = [];
// 사용자가 보낸 데이터를 저장할 때 호출되는 함수
export const saveUserData = async (userId, packetType, payload) => {
  // 패킷타입 유효성 검사
  if (packetType !== 20) {
    throw new Error('Invalid packet type');
  } else {
    // 데이터를 배열에 추가
    userPrivacyId.push({ userId });
    userPrivacyData.push({ payload });
  }
};

// 데이터를 대결하는 사용자에게 전송하는 함수
export const monsterSpawnHandler = async (socket, userId, packetType, payload, io) => {
  // console.log('monsterSpawnHandler');
  const { paths, monsterLevel, monsterNumber } = payload;
  // console.log(paths, monsterLevel, monsterNumber);
  // saveUserData(userId, packetType, payload);

  // payload.set(userPrivacyId.pop(), userPrivacyData.pop());

  const notPacketType = packetTypes.MONSTER_SPAWN_NOTIFICATION;
  const notificationPacket = new NotificationPacket('적 몬스터 넘버 전송', { monsterNumber });

  const packet = serialize(notPacketType, notificationPacket);
  // const test = deserialize(packet, true);
  // console.log(test);

  socket.broadcast.emit('event', packet);

  // // 데이터를 전송한 후 배열 초기화
  // userPrivacyId = [];
  // userPrivacyData = [];
};

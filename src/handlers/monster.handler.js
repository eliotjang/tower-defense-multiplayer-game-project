import packetTypes from "../constants/packet-types.constants.js";
import { serialize } from "../utils/packet-serializer.utils";
import NotificationPacket from './../protobuf/classes/notification/notification.proto';

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

  saveUserData(userId, packetType, payload);

  let payload = new Map();
  payload.set()
  payload.set(userPrivacyId.pop(), userPrivacyData.pop());

  const notificationMonsterSpawnPacket = new NotificationPacket('상대방의 몬스터 데이터가 전송되었습니다.', payload);

  const mosterSpawnPacket = serialize(notificationPacketType, notificationMonsterSpawnPacket);

  io.emit('event', mosterSpawnPacket )

  // 데이터를 전송한 후 배열 초기화
  userPrivacyId = [];
  userPrivacyData = []; 
    
};
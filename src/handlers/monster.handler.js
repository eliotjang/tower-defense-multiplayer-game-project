// monster.handler.js

import packetTypes from "../constants/packet-types.constants";

/* 
<8. 몬스터 생성 (요청 패킷)> + <9. 적 몬스터 생성 (통지 패킷)> : 전체 메커니즘
➺ 1. 1번 사용자의 게임이 시작
➺ 2. 1번 사용자가 monsterNumber를 payload에 담아서 서버에게 보냄   >>> 요청 패킷 (packetType : 20)
➺ 3. payload에 담긴 monsterNumber를 2번 사용자에게 보냄            >>> 통지 패킷 (packetType : 21)
➺ 4. 서버에게 받은 패킷으로 2번 사용자가 monsterNumber를 받으면 몬스터 생성(화면 하단)
*/

// 클라이언트에서 몬스터 생성 데이터를 서버에게 보내는 핸들러


// 사용자 데이터를 담을 배열
let userPrivacy = []; 

// 사용자가 보낸 데이터를 저장할 때 호출되는 함수
export const saveUserData = async (userId, packetType, payload) => {
  // 패킷타입 유효성 검사
  if (packetType !== 20) {
    throw new Error('Invalid packet type');
  } else {
    // 데이터를 배열에 추가
    userPrivacy.push({ userId, ...payload });
  }
  
  
  // 데이터를 전송하는 함수 호출
  await monsterSpawnHandler();
  // 데이터를 전송한 후 배열 초기화
  userPrivacy = [];
};



// 데이터를 대결하는 사용자에게 전송하는 함수
export const monsterSpawnHandler = async (socket, userId, packetType, payload, io) => {
  console.log(packetType, payload);
  // 1번 사용자 데이터를 찾기
  const user1Data = userPrivacy.find(data => data.userId === userPrivacy[0].userId);
  // 2번 사용자 데이터를 찾기
  const user2Data = userPrivacy.find(data => data.userId === userPrivacy[1].userId);

  const notificationPacketType = packetTypes.MONSTER_SPAWN_NOTIFICATION;
  
  if ( user1Data ) {
    // 1번 사용자가 보낸 데이터를 2번 사용자에게 전송
    
    io.to(user2Data.userId).emit('targetMonsterSpawn', {
      packetType: packetTypes.MONSTER_SPAWN_NOTIFICATION,
      path: user1Data.path,
      monsterImages: user1Data.monsterImages,
      level: user1Data.level,
      monsterNumber: user1Data.monsterNumber,
    });
  } else if ( user2Data ) {
    // 2번 사용자가 보낸 데이터를 1번 사용자에게 전송
    io.to(user1Data.userId).emit('targetMonsterSpawn', {
      packetType: 21,
      path: user2Data.path,
      monsterImages: user2Data.monsterImages,
      level: user2Data.level,
      monsterNumber: user2Data.monsterNumber,
    })
  }
    
};


// payload의 데이터를 기반으로 user1 정보 업데이트

// user2에게 알려줄 정보를 담은 패킷 생성 및 전송

//import { getGameAssets } from "../init/assets";
// import { getProtoMessages } from '../init/proto.init';
import { towers, addTower } from '../models/tower.model.js';

export const purchaseTowerHandler = (socket, userId, packetType, payload, io) => {
  /*
  유저 골드 서버와 클라 검증로직 추가
  에셋 사용하면 타워도 검증?
  역직렬화, 직렬화 코드 추가
  */
  const { x, y, userGold, towerCost } = payload;
  const tower = { x, y };
  if (towerCost > userGold) {
    console.log('골드가 부족합니다');
  }
  let newUserGold = userGold - 50;
  //console.log('서버에 타워 추가');
  // console.log(userId);
  addTower(userId, tower);
  console.log(`${userId}님 타워 추가`);
  // console.log(towers);

  socket.emit('newTower', { packetType, newUserGold, x, y });
  socket.broadcast.emit('targetNewTower', { packetType: 11, x, y });
};

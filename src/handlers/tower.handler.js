//import { getGameAssets } from "../init/assets";
// import { getProtoMessages } from '../init/proto.init';
import { towers, addTower } from '../models/tower.model.js';
import { Tower } from '../../public/src/tower.js';

export const purchaseTowerHandler = (socket, userId, packetType, payload, io) => {
  /*
    에셋 사용한다면
  const {towerListData} = getGameAssets();
  생각해보네 payload에 타워 에셋정보가 하나도 없네
  추가한다면
    const findTower = towerListData.data.find((tower) => tower.tower_id === payload.tower.tower_id);
    if (!findTower) {
  console.log('정상적인 타워가 아닙니다');
  return;
    }
    */
  /*
  역직렬화
    const protoMessage = getProtoMessages();
    const payloadType = protoMessage[];
    const decodedPayload = payloadType.decode(payload)
  if (!decodedPayload) {
    console.error('payload패킷 구조가 일치하지 않습니다');
  }
    const { tower, userGold } = decodedPayload;
    */
  // console.log(packetType);
  const { x, y, userGold, towerCost } = payload;
  // console.log(tower, userGold);
  const tower = new Tower(x, y, towerCost);
  if (tower.towerCost > userGold) {
    console.log('골드가 부족합니다');
  }
  let newUserGold = userGold - 50;
  console.log('서버에 타워 추가');
  towers.push(tower);
  // console.log(towers);
  // towers.addTower(userId, tower);
  //userGold = userGold - tower.towerCost;
  // console.log('여기');
  // console.log(towers);

  socket.emit('newTower', { packetType, newUserGold, x, y });
  socket.broadcast.emit('targetNewTower', { packetType: 11, x, y });
};

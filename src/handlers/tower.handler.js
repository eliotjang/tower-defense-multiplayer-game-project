//import { getGameAssets } from "../init/assets";
// import { getProtoMessages } from '../init/proto.init';
import configs from '../config/configs.js';
import { addTower, redisAddTower } from '../models/tower.model.js';

let serverIndex = 0;
export const purchaseTowerHandler = (socket, userId, packetType, payload, io) => {
  /*
  유저 골드 서버와 클라 검증로직 추가
  에셋 사용하면 타워도 검증?
  역직렬화, 직렬화 코드 추가
  */
  //const redisClient = redis.createClient(configs.env.redisHost, configs.env.redisPort);

  const { x, y, userGold, towerCost, index } = payload;
  const towerData = { x, y };
  if (towerCost > userGold) {
    console.log('골드가 부족합니다');
  }
  if (index !== serverIndex) {
    console.log('비정상적인 index값입니다');
  }
  console.log(index);
  let newUserGold = userGold - 50;
  //console.log('서버에 타워 추가');
  // console.log(userId);
  addTower(userId, towerData);
  redisAddTower(userId, towerData, index);
  console.log(`${userId}님 타워 추가`);
  // console.log(towers);

  socket.emit('newTower', { packetType, newUserGold, x, y });
  socket.emit('event', { packetType, newUserGold, x, y }); //패킷응답
  socket.broadcast.emit('targetNewTower', { packetType: 11, x, y });
  socket.broadcast.emit('event', { packetType: 11, x, y }); //패킷통지
  serverIndex++;
};

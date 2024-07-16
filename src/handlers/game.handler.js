import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';
import { userSessionsObjManager } from '../sessions/user.session.js';

const userQueue = [];
const userDataQueue = [];
const numOfInitialTowers = 1;
const canvasWidth = 1500;
const canvasHeight = 540;
const userGold = 1000;
const baseHp = 200;
const highScore = 0;
const towerCost = 500;

export const matchRequestHandler = async (socket, uuid, packetType, payload, io) => {
  console.log('matchRequestHandler');
  // console.log('matchRequestHandler socket.uuid : ', socket.uuid);
  const { timestamp } = payload;
  const monsterPath = generateRandomMonsterPath();

  const initialTowerCoords = [];
  for (let i = 0; i < numOfInitialTowers; i++) {
    const { x, y } = getRandomPositionNearPath(200, monsterPath);
    initialTowerCoords.push({ x, y });
  }
  const lastPoint = monsterPath[monsterPath.length - 1];
  const basePosition = { x: lastPoint.x, y: lastPoint.y };

  const userData = { monsterPath, initialTowerCoords, basePosition };

  userQueue.push(socket.uuid);
  userDataQueue.push(userData);

  if (userQueue.length === 2) {
    matchFound(io, socket.uuid);
  }
};

const matchFound = async (io, uuid) => {
  try {
    console.log('matchFound');

  let payload = new Map();
  payload[userQueue.pop()] = userDataQueue.pop();
  payload[userQueue.pop()] = userDataQueue.pop();

  // console.log(payload);

  for (const key in payload) {
    await gameRedis.createGameData(key, userGold, baseHp);
    // const gameRD = await gameRedis.getGameData(key);
    // console.log(gameRD);
  }
  // console.log(payload);
  const resPacketType = packetTypes.MATCH_FOUND_NOTIFICATION;
  const notificationPacket = new NotificationPacket('대결을 시작합니다!', { score: highScore, data: payload });

  const packet = serialize(resPacketType, notificationPacket);
  // const test = deserialize(packet, true);
  // console.log(test);

  // 대결 시작 (통지 패킷)
  io.emit('event', packet);
};

function generateRandomMonsterPath() {
  const path = [];
  let currentX = 0;
  let currentY = Math.floor(Math.random() * 21) + 500;

  path.push({ x: currentX, y: currentY });

  while (currentX < canvasWidth) {
    currentX += Math.floor(Math.random() * 100) + 50;
    if (currentX > canvasWidth) {
      currentX = canvasWidth;
    }

    currentY += Math.floor(Math.random() * 200) - 100;
    if (currentY < 0) {
      currentY = 0;
    }
    if (currentY > canvasHeight) {
      currentY = canvasHeight;
    }

    path.push({ x: currentX, y: currentY });
  }

  // console.log(path);

  return path;
}

function getRandomPositionNearPath(maxDistance, monsterPath) {
  // console.log('getRandomPositionNearPath');
  // 타워 배치를 위한 몬스터가 지나가는 경로 상에서 maxDistance 범위 내에서 랜덤한 위치를 반환하는 함수!
  const segmentIndex = Math.floor(Math.random() * (monsterPath.length - 1));
  const startX = monsterPath[segmentIndex].x;
  const startY = monsterPath[segmentIndex].y;
  const endX = monsterPath[segmentIndex + 1].x;
  const endY = monsterPath[segmentIndex + 1].y;

  const t = Math.random();
  const posX = startX + t * (endX - startX);
  const posY = startY + t * (endY - startY);

  const offsetX = (Math.random() - 0.5) * 2 * maxDistance;
  const offsetY = (Math.random() - 0.5) * 2 * maxDistance;

  return {
    x: posX + offsetX,
    y: posY + offsetY,
  };
}

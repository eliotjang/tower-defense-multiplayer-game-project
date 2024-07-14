import packetTypes from '../constants/packet-types.constants.js';
import NotificationPacket from '../protobuf/classes/notification/notification.proto.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';

const userQueue = [];
const userDataQueue = [];
const numOfInitialTowers = 3;
const canvasWidth = 1920;
const canvasHeight = 1080;
const userGold = 1000;
const baseHp = 200;

export const matchRequestHandler = async (socket, uuid, packetType, payload, io) => {
  console.log('matchRequestHandler');
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
  // console.log(userData);

  userQueue.push(uuid);
  // console.log(userId);
  userDataQueue.push(userData);
  // console.log(userQueue.length);

  if (userQueue.length === 2) {
    matchFound(io, uuid);
  }
  // io.emit('data', { payload: 'payload' });
};

const matchFound = async (io, uuid) => {
  console.log('matchFound');

  let payload = {};
  payload[userQueue.pop()] = userDataQueue.pop();
  payload[userQueue.pop()] = userDataQueue.pop();

  console.log(payload);

  for (const key in payload) {
    await gameRedis.createGameData(key, userGold, baseHp);
    // const gameRD = await gameRedis.getGameData(key);
    // console.log(gameRD);
  }

  const resPacketType = packetTypes.MATCH_FOUND_NOTIFICATION;
  const notificationPacket = new NotificationPacket('대결을 시작합니다!', payload);

  const packet = serialize(resPacketType, notificationPacket);
  const decoded = deserialize(packet, true);
  {
    const { timestamp, message, payload } = decoded;
    console.log(payload);
  }

  // 대결 시작 (통지 패킷)
  io.emit('event', packet);
};

function generateRandomMonsterPath() {
  const path = [];
  let currentX = 0;
  let currentY = Math.floor(Math.random() * 21) + 500; // 500 ~ 520 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

  path.push({ x: currentX, y: currentY });

  while (currentX < canvasWidth) {
    currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
    // x 좌표에 대한 clamp 처리
    if (currentX > canvasWidth) {
      currentX = canvasWidth;
    }

    currentY += Math.floor(Math.random() * 200) - 100; // -100 ~ 100 범위의 y 변경
    // y 좌표에 대한 clamp 처리
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

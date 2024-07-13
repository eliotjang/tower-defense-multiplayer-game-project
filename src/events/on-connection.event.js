import { createUser, findUserByUserId, findUserByUUID, updateUserLogin } from '../db/user/user.db.js';
import { handleConnection } from '../handlers/helper.js';
import { userRedis } from '../utils/redis.utils.js';
import onData from './on-data.event.js';
import { v4 as uuidv4 } from 'uuid';

const onConnection = (io) => async (socket) => {
  console.log('onConnection'); // 디버깅 콘솔 로그
  // jwt verify

  // 아이디 임의 생성
  const password = '1234';
  const userId = uuidv4();
  const uuid = uuidv4();
  const token =
    'Bearauthorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEwLCJpYXQiOjE3MTc2NzM0ODF9.hLUf94PBDhrz6joCSpwU_9n0FPH09Nf9xwPXYHLnkek';

  let userDB = await findUserByUserId(userId);
  if (!userDB) {
    userDB = await createUser(userId, password);
    console.log('새로운 유저가 DB에 등록되었습니다.');
  } else {
    await updateUserLogin(userDB.userId);
    console.log('기존 유저 정보를 불러옵니다.');
  }

  // console.log(socket);
  let userRD = await userRedis.getUserData(userId);
  if (!userRD) {
    console.log('새로운 Redis 데이터 생성');
    await userRedis.createUserData(userId, uuid, token);
    userRD = await userRedis.getUserData(userId);
  }

  console.log(userRD);

  handleConnection(socket, userDB.uuid);

  socket.on('event', onData(io, socket));
  // socket.on('disconnect', onDisconnect(socket));
};

export default onConnection;

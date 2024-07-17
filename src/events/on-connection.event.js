import { verifyToken } from '../auth/auth.js';
import { createUser, findUserByUserId, findUserByUUID, updateUserLogin } from '../db/user/user.db.js';
import { handleConnection } from '../handlers/helper.js';
import { userSessionsManager as usm } from '../sessions/user.session.js';
import { removeUserGameData } from '../utils/data-remover.utils.js';
import { userRedis } from '../utils/redis.utils.js';
import onData from './on-data.event.js';

const onConnection = (io) => async (socket) => {
  console.log('onConnection'); // 디버깅 콘솔 로그
  // console.log(socket.handshake.auth.userId);
  // jwt verify

  //handleConnection(socket, userDB.uuid);
  if (socket.handshake.auth?.token) {
    try {
      const user = await verifyToken(socket.handshake.auth.token);
      // 검증 완료
      socket.uuid = user.uuid;
      const userInstance = usm.getUserByUuid(user.uuid);
      if (userInstance) {
        // 유저 세션 있으면 새 소켓으로 업데이트
        userInstance.socket = socket;
        // 찌꺼기 게임 데이터 있으면 삭제
        removeUserGameData(userInstance);
      } else {
        // 세션 없으면 생성
        usm.addUser(user.uuid, socket);
      }
      console.log('초기 토큰 검증 성공: ID', user.userId);
    } catch (err) {
      //검증 실패 시 메세지만 출력 (에러 x)
      console.error('초기 토큰 검증 실패:', err);
    }
  }

  socket.on('event', onData(io, socket)); // , userDB.uuid));
};

export default onConnection;

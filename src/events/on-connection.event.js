import { verifyToken } from '../auth/auth.js';
import { userSessionsManager as usm } from '../sessions/user.session.js';
import { removeGameSession } from '../utils/session-remover.utils.js';
import onData from './on-data.event.js';
import onError from './on-error.event.js';

const onConnection = (io) => async (socket) => {
  // jwt verify
  if (socket.handshake.auth?.token) {
    try {
      const user = await verifyToken(socket.handshake.auth.token);
      // 검증 완료
      socket.uuid = user.uuid;
      const userInstance = usm.getUserByUuid(user.uuid);
      if (userInstance) {
        // 유저 세션 있으면 새 소켓으로 업데이트
        userInstance.socket = socket;
        removeGameSession(socket.uuid);
        // removeUserGameData(userInstance);
      } else {
        // 세션 없으면 생성
        usm.addUser(user.uuid, socket);
      }
      console.log('초기 토큰 검증 성공: ID', user.userId);
      socket.emit('connection', { verified: true });
    } catch (err) {
      // 검증 실패 시 메세지만 출력 (에러 x)
      console.error('초기 토큰 검증 실패:', err);
      socket.emit('connection', { verified: false });
    }
  }

  socket.on('event', onData(io, socket));
  socket.on('error', onError(socket));
};

export default onConnection;

import { removeGameSession } from '../utils/session-remover.utils.js';

const gameEndHandler = async (socket, userId, packetType, payload, io) => {
  // 게임 데이터 정리 / 유저 상태 후처리
  await removeGameSession(socket.uuid, socket.gameId);
};

export default gameEndHandler;

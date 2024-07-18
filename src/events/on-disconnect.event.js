import { handleError } from '../utils/errors/errorHandler.js';
import { removeGameSession, removeUserSession } from '../utils/session-remover.utils.js';

const onDisconnect = (socket) => async () => {
  //
  try {
    console.log('User disconnected:', socket.uuid);
    await removeUserSession(socket.uuid, true);
    // removeGameSession(socket.uuid, socket.gameId);
  } catch (err) {
    await handleError(socket, err);
  }
};

export default onDisconnect;

import { gameSessionsManager } from '../sessions/game.session.js';
import { userSessionsManager } from '../sessions/user.session.js';

export const matchRequestHandler = async (socket, uuid, packetType, payload, io) => {
  console.log('matchRequestHandler');
  const { timestamp } = payload;

  const game = gameSessionsManager.joinWaitingGame(userSessionsManager.getUserByUuid(socket.uuid));
  socket.gameId = game.gameId;
};

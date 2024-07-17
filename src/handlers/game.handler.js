import { gameSessionsManager as gsm } from '../sessions/game.session.js';
import { userSessionsManager as usm } from '../sessions/user.session.js';

export const matchRequestHandler = async (socket, uuid, packetType, payload, io) => {
  console.log('matchRequestHandler');
  const { timestamp } = payload;

  const user = usm.getUserBySocket(socket);
  const game = await gsm.joinWaitingGame(user);
  socket.gameId = game.gameId;
};

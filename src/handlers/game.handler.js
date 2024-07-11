import { serialize } from '../utils/packet-serializer.utils.js';

export const matchRequestHandler = async (socket, uuid, packetType, payload) => {
  const {} = payload;
  const data = 'test';

  socket.emit('data', { packetType: 1, token: 'token', clientVersion: '1.0.0', payload: data });
};

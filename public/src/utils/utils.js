import { getToken } from '../auth/token.auth.js';
import packetTypes from '../constants/packet-types.constants.js';
import RequestPacket from '../protobuf/classes/request.proto.js';
import Socket from '../socket.js';

export const isNullish = (value) => {
  if (value === null || typeof value === 'undefined') {
    return true;
  }
  return false;
};

export const pong = (serverTimestamp) => {
  Socket.sendEventProto(packetTypes.PING_REQUEST, { timestamp: serverTimestamp });
};

import protoTypeNames from '../constants/proto-type-names.constants.js';

const handleConnection = (socket) => {};

export const getHandlerByPacketType = (packetType) => {
  return protoTypeNames[packetType]?.handler;
};

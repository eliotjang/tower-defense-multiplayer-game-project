import handlerMappings from "../constants/handler.constants.js";

const handleConnection = (socket) => {};

export const getHandlerByPacketType = (packetType) => {
  return handlerMappings[packetType]?.handler;
};

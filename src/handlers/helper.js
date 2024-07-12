import handlerMappings from "../constants/handler.constants.js";

export const handleConnection = (socket, uuid) => {
  socket.emit('connection', { uuid });
};

export const handleDisconnect = (socket, uuid) => {
  console.log(`유저 연결을 해제합니다.`);
  socket.isAuthenticated = false; // 인증 정보 초기화
  console.log(`uuid : ${uuid}, socket id : ${socket.id}`);
};

export const getHandlerByPacketType = (packetType) => {
  return handlerMappings[packetType]?.handler;
};

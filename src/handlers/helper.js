export const handleConnection = (socket, userUUID) => {
  socket.emit('connection', { uuid: userUUID });
};

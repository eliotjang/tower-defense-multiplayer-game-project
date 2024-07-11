import onData from "./on-data.event.js";

const onConnection = (socket) => {
  // handleConnection(socket)

  socket.on("data", onData(socket));
  socket.on("disconnect", onDisconnect(socket));
  //
};

export default onConnection;

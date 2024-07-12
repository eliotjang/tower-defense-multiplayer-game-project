import onData from "./on-data.event.js";

const onConnection = (io) => async (socket) => {
  // jwt verify

  // handleConnection(socket);

  socket.on("data", onData(io, socket));
  socket.on("disconnect", onDisconnect(io, socket));
  //
};

export default onConnection;

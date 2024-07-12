import { loadProtoFiles } from "./proto.init.js";
// import { loadGameAssets } from "./assets.js";
import initSocket from "./socket.js";

const initServer = async (server) => {
  try {
    // await loadGameAssets();
    await loadProtoFiles();
    initSocket(server);
  } catch (err) {
    //
  }
};

export default initServer;

import pools from '../db/database.js';
import { testAllConnections } from '../utils/db/testConnection.js';
import { loadProtoFiles } from './proto.init.js';
// import { loadGameAssets } from "./assets.js";
import initSocket from './socket.js';

const initServer = async (server) => {
  try {
    // await loadGameAssets();
    await loadProtoFiles();
    // await testAllConnections(pools); // 데이터베이스 연동 테스트
    initSocket(server);
  } catch (err) {
    console.err(err);
    process.exit(1);
  }
};

export default initServer;

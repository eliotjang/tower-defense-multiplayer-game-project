import { loadProtoFiles } from "./proto.init.js";
import { loadGameAssets } from "./assets.js";

const initServer = async () => {
  try {
    // await loadGameAssets();
    await loadProtoFiles();
  } catch (err) {
    //
  }
};

export default initServer;

import { loadProtoFile } from '../protobuf/load-proto.js';
import { SERVER_URL } from '../constants/constants.js';
import Socket from '../socket.js';

const init = () => {
  loadProtoFile();
  new Socket(SERVER_URL);
};

export default init;

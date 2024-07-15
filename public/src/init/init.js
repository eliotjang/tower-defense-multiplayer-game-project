import { loadProtoFile } from '../protobuf/load-proto.js';
import { SERVER_URL } from '../constants/constants.js';
import Socket from '../socket.js';

const init = () => {
  try {
    loadProtoFile();
    new Socket(SERVER_URL);
    console.log('init complete');
  } catch (err) {
    console.error('init error');
  }
};

export default init;

import { loadProtoFile } from '../protobuf/load-proto.js';
import { SERVER_URL } from '../constants/constants.js';
import Socket from '../socket.js';

const init = () => {
  try {
    loadProtoFile();
    new Socket(SERVER_URL);
    //console.log('init complete'); //클라이언트 프로토파일 로드 성공 여부 콘솔
  } catch (err) {
    console.error('init error');
  }
};

export default init;

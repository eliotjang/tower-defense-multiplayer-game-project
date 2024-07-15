import { getHandlerByPacketType } from '../handlers/helper.js';
import { deserialize } from '../utils/packet-serializer.utils.js';
import configs from '../config/configs.js';
import packetTypes from '../constants/packet-types.constants.js';

const onData = (io, socket) => async (data) => {
  try {
    const decoded = deserialize(data, true);
    const packetType = data.packetType;
    const { token, clientVersion, payload } = decoded;
    // console.log(decoded); // 공통 요청
    // console.log(payload); // 페이로드 확인용 콘솔 로그

    // token 검증?
    verifyToken(token);

    // clientVersion 검증
    verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    const handler = getHandlerByPacketType(packetType);

    if (!handler) {
      throw new Error('유효하지 않은 핸들러');
    }
    console.log('packetType:', packetType, '  handler:', handler);
    // handler 실행
    await handler(socket, null, packetType, payload, io);
  } catch (err) {
    console.error('onData:', err); // 임시
    // handleError(socket, err);
  }
};

const verifyToken = (token) => {
  // 토큰 검증
  // 실패 시 에러 발생
};

const verifyClientVersion = (clientVersion) => {
  // 클라이언트 버전 검증
  if (clientVersion !== configs.client.clientVersion) {
    // 실패 시 에러 발생
    throw new Error('클라이언트 버전 검증 실패');
  }
};

export default onData;

import { getHandlerByPacketType } from '../handlers/helper.js';
import { deserialize } from '../utils/packet-serializer.utils.js';
import configs from '../config/configs.js';
import packetTypes from '../constants/packet-types.constants.js';

let userId;

const onData = (io, socket) => async (data) => {
  try {
    const decoded = deserialize(data);
    const packetType = data.packetType;
    const { token, clientVersion } = decoded;
    // const { packetType, clientVersion, payload } = data;

    // token 검증?
    verifyToken(token);

    // clientVersion 검증
    verifyClientVersion(clientVersion);

    // 유저 아이디 임시 저장
    if (packetType === packetTypes.MATCH_REQUEST) {
      userId = token.userId; // payload.userId;
    }

    // packetType으로 handler 찾기
    const handler = getHandlerByPacketType(packetType);

    // 핸들러 임시 핸들링
    // const handler = packetTypeMappings[packetType];

    if (!handler) {
      throw new Error('유효하지 않은 핸들러');
    }
    console.log('packetType:', packetType, '  handler:', handler);
    // handler 실행
    await handler(socket, userId, packetType, decoded, io);
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

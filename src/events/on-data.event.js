import { getHandlerByPacketType } from '../handlers/helper.js';
import { deserialize } from '../utils/packet-serializer.utils.js';
import { verifyToken } from '../auth/auth.js';
import configs from '../config/configs.js';
import packetTypes from '../constants/packet-types.constants.js';
import CustomError from '../utils/errors/customError.js';
import { ErrorCodes } from '../utils/errors/errorCodes.js';

const onData = (io, socket) => async (data) => {
  try {
    const decoded = deserialize(data, true);
    const packetType = data.packetType;
    const { token, clientVersion, payload } = decoded;
    // console.log(decoded); // 공통 요청
    // console.log(payload); // 페이로드 확인용 콘솔 로그
    // token 검증?
    // if (token !== null || typeof token !== 'undefined') {
    if (!socket.verified && !bypassTokenVerification(packetType)) {
      if (await verifyToken(token)) {
        socket.verified = true;
      }
    }

    // clientVersion 검증
    verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    const handler = getHandlerByPacketType(packetType);

    if (!handler) {
      console.log('packetType, payload : ', packetType, payload);
      throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, '유효하지 않은 핸들러');
    }
    // handler 실행
    await handler(socket, null, packetType, payload, io);
  } catch (err) {
    console.error('onData:', err); // 임시
  }
};

const bypassTokenVerification = (packetType) => {
  switch (packetType) {
    case packetTypes.SIGN_UP_REQUEST: {
      return true;
    }
    case packetTypes.SIGN_IN_REQUEST: {
      return true;
    }
    default: {
      return false;
    }
  }
};

const verifyClientVersion = (clientVersion) => {
  // 클라이언트 버전 검증
  if (clientVersion !== configs.client.clientVersion) {
    // 실패 시 에러 발생
    throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH, '클라이언트 버전 검증 실패');
  }
};

export default onData;

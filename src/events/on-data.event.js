import { getHandlerByPacketType } from '../handlers/helper.js';
import { deserialize } from '../utils/packet-serializer.utils.js';
import configs from '../config/configs.js';
import jwt from 'jsonwebtoken';

const onData = (io, socket) => async (data) => {
  try {
    const decoded = deserialize(data, true);
    const packetType = data.packetType;
    const { token, clientVersion, payload } = decoded;
    // console.log(decoded); // 공통 요청
    // console.log(payload); // 페이로드 확인용 콘솔 로그
    // token 검증?
    if (token != 'token') {
      verifyToken(token);
    }

    // clientVersion 검증
    verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    const handler = getHandlerByPacketType(packetType);

    if (!handler) {
      throw new Error('유효하지 않은 핸들러');
    }
    // console.log('packetType:', packetType, '  handler:', handler);
    // handler 실행
    await handler(socket, null, packetType, payload, io);
  } catch (err) {
    console.error('onData:', err); // 임시
    // handleError(socket, err);
  }
};

const verifyToken = async (token) => {
  // 토큰 검증
  try {
    const decodedToken = jwt.verify(token, configs.env.jwtSecret);
    const user_id = decodedToken.id;
    console.log(user_id);

    if (!user_id) {
      throw new Error('로그인 정보가 필요합니다');
    }
    const user = await findUserByUserId(user_id);

    if (!user) {
      throw new Error('토큰 사용자가 존재하지 않습니다.');
    }
    next();
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        throw new Error('토큰이 만료되었습니다.');
      case 'JsonWebTokenError':
        throw new Error('토큰이 조작되었습니다.');
      default:
        throw new Error('비정상적인 요청입니다.');
    }
  }
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

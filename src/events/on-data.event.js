import { getProtoMessages } from '../init/proto.init.js';
import { getHandlerByPacketType } from '../handlers/helper.js';
import { matchRequestHandler } from '../handlers/game.handler.js';
import packetTypeMappings from '../handlers/packetTypeMapping.js';

let userId;

const onData = (io, socket) => async (data) => {
  try {
    // console.log('onData'); // 디버깅 콘솔 로그
    // data 역직렬화 (protobuf)
    // const decoded = getProtoMessages().GamePacket.decode(data);
    // const { packetType, clientVersion, payload } = decoded;
    const { packetType, clientVersion, payload } = data;

    // clientVersion 검증
    // verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    // const handler = getHandlerByPacketType(packetType);

    // 핸들러 임시 핸들링
    const handler = packetTypeMappings[packetType];
    if (!handler) {
      throw new Error('유효하지 않은 핸들러');
    }

    // 유저 아이디 임시 저장
    if (packetType === 3) {
      userId = payload.userId;
    }
    // handler 실행
    await handler(socket, userId, packetType, payload, io);
  } catch (err) {
    // handleError(socket, err);
  }
};

const verifyClientVersion = (clientVersion) => {
  //
};

export default onData;

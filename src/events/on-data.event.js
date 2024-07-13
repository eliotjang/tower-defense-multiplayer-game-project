import { getProtoMessages } from "../init/proto.init.js";
import { getHandlerByPacketType } from "../handlers/helper.js";
import { matchRequestHandler } from "../handlers/game.handler.js";
import packetTypeMappings from "../handlers/packetTypeMapping.js";
import { deserialize } from "../utils/packet-serializer.utils.js";
import configs from "../config/configs.js";

let userId;

const onData = (io, socket) => async (data) => {
  try {
    const decoded = deserialize(data);
    const { packetType, token, clientVersion, payload } = decoded;
    // const { packetType, clientVersion, payload } = data;

    // token 검증?
    verifyToken(token);

    // clientVersion 검증
    verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    const handler = getHandlerByPacketType(packetType);

    // 핸들러 임시 핸들링
    // const handler = packetTypeMappings[packetType];

    if (!handler) {
      throw new Error("유효하지 않은 핸들러");
    }

    // 유저 아이디 임시 저장
    if (packetType === 3) {
      userId = payload.userId;
    }
    // handler 실행
    await handler(socket, userId, packetType, payload, io);
  } catch (err) {
    console.error("onData:", err); // 임시
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
    throw new Error("클라이언트 버전 검증 실패");
  }
};

export default onData;

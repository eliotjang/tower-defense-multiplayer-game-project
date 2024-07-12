import { getHandlerByPacketType } from "../handlers/helper.js";
import { deserializeRequest } from "../utils/packet-serializer.utils.js";

const onData = (io, socket) => async (data) => {
  try {
    // data 역직렬화 (protobuf)
    const decoded = deserializeRequest(data);
    const { packetType, token, clientVersion, payload } = decoded;

    // token 검증?

    // clientVersion 검증
    verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    const handler = getHandlerByPacketType(packetType);

    if (!handler) {
      // 핸들러 없음 (error)
    }

    // handler 실행
    await handler({ socket, userId, packetType, payload });
  } catch (err) {
    console.error(err); // 임시
    // handleError(socket, err);
  }
};

const verifyClientVersion = (clientVersion) => {
  //
};

export default onData;

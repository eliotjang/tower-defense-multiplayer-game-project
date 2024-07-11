import { getHandlerByPacketType } from "../handlers/helper.js";
import { getProtoMessages } from "../init/proto.init.js";

const onData = (socket) => (data) => {
  try {
    // data 역직렬화 (protobuf)
    const decoded = getProtoMessages().GamePacket.decode(data);
    const { packetType, clientVersion, payload } = decoded;

    // clientVersion 검증
    verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    const handler = getHandlerByPacketType(packetType);

    // handler 실행
    handler({ socket, userId, packetType, payload });
  } catch (err) {
    // handleError(socket, err);
  }
};

const verifyClientVersion = (clientVersion) => {
  //
};

export default onData;

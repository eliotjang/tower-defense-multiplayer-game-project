import { getProtoMessages } from "../init/proto.init.js";

const onData = (socket) => (data) => {
  try {
    // data 역직렬화 (protobuf)
    const decoded = getProtoMessages();
    const { packetType, clientVersion, payload } = decoded;

    // clientVersion 검증

    // packetType으로 handler 찾기
    const handler = "";

    // handler 실행
    handler({ socket, packetType, payload });
  } catch (err) {
    // handleError(socket, err);
  }
};

export default onData;

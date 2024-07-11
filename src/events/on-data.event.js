import protoTypeNames from '../constants/packet-names.constants.js';
import packetTypes from '../constants/packet-types.constants.js';
import packetTypeMappings from '../handlers/packetTypeMapping.js';
import { getProtoMessages } from '../init/proto.init.js';

const onData = (socket) => (data) => {
  try {
    console.log('onData');
    // data 역직렬화 (protobuf)
    const decoded = getProtoMessages().GamePacket;
    const { packetType, clientVersion, payload } = decoded;

    // const decodedPayload = getProtoMessages()[].decode(payload);
    // clientVersion 검증

    // packetType으로 handler 찾기
    const handler = packetTypeMappings[data.packetType];

    // handler 실행
    // handler({ socket, userId, packetType, decodedPayload });

    console.log(data);
    // handler({ socket, userId: data.payload.userId, packetType, decodedPayload });
  } catch (err) {
    // handleError(socket, err);
  }
};

export default onData;

import protoTypeNames from '../constants/packet-names.constants.js';
import packetTypes from '../constants/packet-types.constants.js';
import packetTypeMappings from '../handlers/packetTypeMapping.js';
import { getProtoMessages } from '../init/proto.init.js';
import { getHandlerByPacketType } from '../handlers/helper.js';
import { getProtoMessages } from '../init/proto.init.js';

const onData = (socket) => (data) => {
  try {
    console.log('onData');
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

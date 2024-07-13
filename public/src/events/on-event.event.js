import { deserialize } from '../utils/packet-serializer.js';
import { getMessageNameByPacketType } from '../constants/packet-types.constants.js';
import { getHandlerByPacketType } from '../handlers/index.handler.js';

const onEvent = (socket) => async (data) => {
  try {
    // 역직렬화
    console.log(`data: ${data}`, data, data.packet.byteLength);
    const packetType = data.packetType;
    const payload = deserialize(data);

    // packetType으로 매핑된 핸들러 찾기
    const handler = getHandlerByPacketType(packetType);

    // 핸들러 없을 시 에러
    if (!handler) {
      throw new Error('핸들러가 존재하지 않습니다.');
    }

    await handler(socket, packetType, payload); // 인자 뭐 넣지?
  } catch (err) {
    console.error(err); // 임시
  }
};

export default onEvent;

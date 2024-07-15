import { deserialize } from '../utils/packet-serializer.js';
import { getHandlerByPacketType } from '../handlers/index.handler.js';

const onEvent = (socket) => async (data) => {
  try {
    // 역직렬화
    data.packet = new Uint8Array(data.packet);
    const packetType = data.packetType;
    const packet = deserialize(data, true);
    const { timestamp, message, payload } = packet;

    // packetType으로 매핑된 핸들러 찾기
    const handler = getHandlerByPacketType(packetType);

    // console.log('packetType : ', packetType);

    // 핸들러 없을 시 에러
    if (!handler) {
      throw new Error('핸들러가 존재하지 않습니다.');
    }

    await handler({ socket, packetType, payload }); // 임시, 필요한 인자 추가 예정
  } catch (err) {
    console.error(err); // 임시
  }
};

export default onEvent;

import { deserialize } from '../utils/packet-serializer.js';
import { getHandlerByPacketType } from '../handlers/index.handler.js';
import packetTypes from '../constants/packet-types.constants.js';
import { pong } from '../utils/utils.js';

const onEvent = (socket) => async (data) => {
  try {
    // 역직렬화
    data.packet = new Uint8Array(data.packet);
    const packetType = data.packetType;
    const packet = deserialize(data, true);
    const { code, message, payload } = packet;
    // console.log('code:', code, '  | message:', message); //수신받은 코드(성공 0,실패 그 외 다른 값)와 메세지 출력 콘솔

    // ping-pong
    if (packetType === packetTypes.PING_RESPONSE) {
      pong(payload.timestamp);
      return;
    }

    // packetType으로 매핑된 핸들러 찾기
    const handler = getHandlerByPacketType(packetType);

    // 핸들러 없을 시 에러
    if (!handler) {
      throw new Error('핸들러가 존재하지 않습니다.');
    }

    await handler({ socket, packetType, payload }); // 임시, 필요한 인자 추가 예정
  } catch (err) {
    console.error(err);
  }
};

export default onEvent;

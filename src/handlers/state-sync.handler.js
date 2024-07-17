import packetTypes from '../constants/packet-types.constants.js';
import { getGameAssets } from '../init/assets.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { deserialize, serialize } from '../utils/packet-serializer.utils.js';
import { gameRedis } from '../utils/redis.utils.js';

export const stateSyncRequestHandler = async (socket, uuid, packetType, payload, io) => {
  const { timestamp } = payload;
  const { game } = getGameAssets();
  const { levelUpScore } = game.data;

  await gameRedis.patchGameDataScore(socket.uuid, levelUpScore);

  const resPacketType = packetTypes.STATE_SYNC_RESPONSE;

  const responsePacket = new ResponsePacket(0, '상태 동기화', { levelUpScore });

  const packet = serialize(resPacketType, responsePacket);

  socket.emit('event', packet);
};

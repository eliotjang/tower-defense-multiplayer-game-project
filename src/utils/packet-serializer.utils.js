import protoTypeNames from "../constants/proto-type-names.constants.js";
import { getProtoMessages } from "../init/proto.init.js";

const GamePacket = getProtoMessages()[protoTypeNames.GAME_PACKET];

export const serialize = (packetType, payload) => {
  // const MessageType = getProtoMessages()[protoTypeNames[packetType].response];
  const encoded = GamePacket.encode(payload).finish();

  return encoded;
};

export const deserialize = (packetType, payload) => {
  // const MessageType = getProtoMessages()[protoTypeNames[packetType].request];
  const decoded = GamePacket.decode(payload);

  return decoded;
};

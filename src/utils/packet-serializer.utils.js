import protoTypeNames from "../constants/proto-type-names.constants.js";
import { getProtoMessages } from "../init/proto.init.js";

export const serialize = (packetType, payload) => {
  const MessageType = getProtoMessages()[protoTypeNames[packetType].response];
  const encoded = MessageType.encode(payload);

  return encoded;
};

export const deserialize = (packetType, payload) => {
  const MessageType = getProtoMessages()[protoTypeNames[packetType].request];
  const decoded = MessageType.decode(payload);

  return decoded;
};

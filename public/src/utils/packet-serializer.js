import packetNames from "../constants/packet-names.constants.js";
import { getProtoMessages } from "../init/load-proto.js";

/**
 *
 * @deprecated
 * @param {*} packetType
 * @param {*} payloadData
 * @returns
 */
export const serialize = (packetType, payloadData) => {
  // const MessageType = getProtoMessages()[protoTypeNames[packetType].response];
  const encoded = GamePacket.encode(payload).finish();

  return encoded;
};

/**
 *
 * @param {} param0
 * @returns
 */
export const serializeRequest = ({ packetType, token, clientVersion, payload }) => {
  const RequestPacket = getProtoMessages()[packetNames.packet.request];
  const payloadData = {
    packetType,
    token,
    clientVersion,
    [packetNames.payload[packetType].key]: payload,
  };
  const serialized = RequestPacket.encode(payloadData).finish();
  return serialized;
};

export const serializeResponse = ({ packetType, success, failCode, message, payload }) => {
  const ResponsePacket = getProtoMessages()[packetNames.packet.response];
  const payloadData = {
    packetType,
    success,
    failCode,
    message,
    [packetNames.payload[packetType].key]: payload,
  };
  const serialized = ResponsePacket.encode(payloadData).finish();
  return serialized;
};

export const serializeNotification = ({ packetType, timestamp, message, payload }) => {
  const NotificationPacket = getProtoMessages()[packetNames.packet.notification];
  const payloadData = {
    packetType,
    timestamp,
    message,
    [packetNames.payload[packetType].key]: payload,
  };
  const serialized = NotificationPacket.encode(payloadData).finish();
  return serialized;
};

/**
 *
 * @deprecated
 * @param {*} packetType
 * @param {*} payloadData
 * @returns
 */
export const deserialize = (packetType, payloadData) => {
  // const MessageType = getProtoMessages()[protoTypeNames[packetType].request];
  const decoded = GamePacket.decode(payload);

  return decoded;
};

export const deserializeRequest = (packet) => {
  const RequestPacket = getProtoMessages()[packetNames.packet.request];
  const deserialized = RequestPacket.decode(packet);
  return deserialized;
};

export const deserializeResponse = (packet) => {
  const ResponsePacket = getProtoMessages()[packetNames.packet.response];
  const deserialized = ResponsePacket.decode(packet);
  return deserialized;
};

export const deserializeNotification = (packet) => {
  const NotificationPacket = getProtoMessages()[packetNames.packet.notification];
  const deserialized = NotificationPacket.decode(packet);
  return deserialized;
};

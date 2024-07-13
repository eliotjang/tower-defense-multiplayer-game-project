import packetNames from "../constants/packet-names.constants.js";
import { getMessageNameByPacketType } from "../constants/packet-types.constants.js";
import protoTypeNames from "../constants/proto-type-names.constants.js";
import { getProtoMessages } from "../init/proto.init.js";

/**
 * 패킷 타입을 이용해 페이로드를 직렬화하여 반환하는 함수. 세 번째 인자를 true로 설정하면 packetType과 payload키를 가지는 객체를 반환한다.
 * @param {Number} packetType packet type number
 * @param {Object} payloadData payload data to be serialized
 * @param {Boolean} withHeader whether to attach packetType key to the returned object
 * @returns serialized payload (Buffer), or object in the form of { packetType, payload } if 'withHeader' is true.
 */
export const serialize = (packetType, payloadData, withHeader) => {
  const serializer = serializers[getMessageNameByPacketType(packetType)];
  const encoded = serializer(packetType, payloadData);

  return withHeader ? { packetType, packet: encoded } : encoded;
};

const serializeRequest = (packetType, { token, clientVersion, payload }) => {
  const RequestPacket = getProtoMessages()[packetNames.packet.request];
  const payloadData = {
    token,
    clientVersion,
    [packetNames.payload[packetType]]: payload,
  };
  const serialized = RequestPacket.encode(payloadData).finish();
  return serialized;
};

const serializeResponse = (packetType, { success, failCode, message, payload }) => {
  const ResponsePacket = getProtoMessages()[packetNames.packet.response];
  const payloadData = {
    success,
    failCode,
    message,
    [packetNames.payload[packetType]]: payload,
  };
  const serialized = ResponsePacket.encode(payloadData).finish();
  return serialized;
};

const serializeNotification = (packetType, { timestamp, message, payload }) => {
  const NotificationPacket = getProtoMessages()[packetNames.packet.notification];
  const payloadData = {
    timestamp,
    message,
    [packetNames.payload[packetType]]: payload,
  };
  const serialized = NotificationPacket.encode(payloadData).finish();
  return serialized;
};

const serializers = {
  [protoTypeNames.REQUEST]: serializeRequest,
  [protoTypeNames.RESPONSE]: serializeResponse,
  [protoTypeNames.NOTIFICATION]: serializeNotification,
};

/**
 * 패킷을 역직렬화하는 함수. 받은 데이터를 그대로 넣어주면 된다.
 * @param {Object} packet packet received
 * @returns deserialied packet payload
 */
export const deserialize = (data) => {
  const { packetType, packet } = data;
  const MessageType = getProtoMessages()[getMessageNameByPacketType(packetType)];
  const deserialized = MessageType.decode(packet);

  return deserialized;
};

const deserializeRequest = (packet) => {
  const RequestPacket = getProtoMessages()[packetNames.packet.request];
  const deserialized = RequestPacket.decode(packet);
  return deserialized;
};

const deserializeResponse = (packet) => {
  const ResponsePacket = getProtoMessages()[packetNames.packet.response];
  const deserialized = ResponsePacket.decode(packet);
  return deserialized;
};

const deserializeNotification = (packet) => {
  const NotificationPacket = getProtoMessages()[packetNames.packet.notification];
  const deserialized = NotificationPacket.decode(packet);
  return deserialized;
};

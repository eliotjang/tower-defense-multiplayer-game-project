import {
  getMessageNameByPacketType,
  getPayloadKeyNameByPacketType,
  packetNames,
} from '../constants/proto.constants.js';
import { getProtoMessages } from '../init/proto.init.js';
import CustomError from './errors/customError.js';
import { ErrorCodes } from './errors/errorCodes.js';

/**
 * 패킷 타입을 이용해 페이로드를 직렬화하여 반환하는 함수. 세 번째 인자를 true로 설정하면 packetType과 payload키를 가지는 객체를 반환한다.
 * @param {Number} packetType packet type number
 * @param {Object} payloadData payload data to be serialized
 * @param {Boolean} withoutHeader whether to attach packetType key to the returned object
 * @returns serialized payload (Buffer), or object in the form of { packetType, payload } if 'withHeader' is true.
 */
export const serialize = (packetType, payloadData, withoutHeader) => {
  const serializer = serializers[getMessageNameByPacketType(packetType)];
  const encoded = serializer(packetType, payloadData);

  return withoutHeader ? encoded : { packetType, packet: encoded };
};

const serializeRequest = (packetType, { token, clientVersion, payload }) => {
  const RequestPacket = getProtoMessages()[packetNames.REQUEST];
  const payloadData = {
    token,
    clientVersion,
    [getPayloadKeyNameByPacketType(packetType)]: payload,
  };
  verifyPacket(RequestPacket, payloadData);
  const serialized = RequestPacket.encode(payloadData).finish();
  return serialized;
};

const serializeResponse = (packetType, { code, message, payload }) => {
  const ResponsePacket = getProtoMessages()[packetNames.RESPONSE];
  const payloadData = {
    code,
    message,
    [getPayloadKeyNameByPacketType(packetType)]: payload,
  };
  verifyPacket(ResponsePacket, payloadData);
  const serialized = ResponsePacket.encode(payloadData).finish();
  return serialized;
};

const serializeNotification = (packetType, { timestamp, message, payload }) => {
  const NotificationPacket = getProtoMessages()[packetNames.NOTIFICATION];
  const payloadData = {
    timestamp,
    message,
    [getPayloadKeyNameByPacketType(packetType)]: payload,
  };
  verifyPacket(NotificationPacket, payloadData);
  const serialized = NotificationPacket.encode(payloadData).finish();
  return serialized;
};

const serializers = {
  [packetNames.REQUEST]: serializeRequest,
  [packetNames.RESPONSE]: serializeResponse,
  [packetNames.NOTIFICATION]: serializeNotification,
};

/**
 * 패킷의 페이로드를 역직렬화하고 반환하는 함수. 받은 데이터를 그대로 넣어주면 된다.
 * @param {Object} data 수신한 데이터
 * @param {boolean} sanitize payload의 key를 'payload'로 변환
 * @returns deserialied packet payload
 */
export const deserialize = (data, sanitize) => {
  const { packetType, packet } = data;
  const MessageType = getProtoMessages()[getMessageNameByPacketType(packetType)];
  const deserialized = MessageType.decode(packet);

  if (sanitize) {
    const payloadKeyName = getPayloadKeyNameByPacketType(packetType);
    const sanitized = Object.fromEntries(
      Object.entries(deserialized).map(([key, value]) => {
        if (key === payloadKeyName) {
          return ['payload', value];
        }
        return [key, value];
      })
    );
    return sanitized;
  }

  return deserialized;
};

const deserializeRequest = (packet) => {
  const RequestPacket = getProtoMessages()[packetNames.REQUEST];
  const deserialized = RequestPacket.decode(packet);
  return deserialized;
};

const deserializeResponse = (packet) => {
  const ResponsePacket = getProtoMessages()[packetNames.RESPONSE];
  const deserialized = ResponsePacket.decode(packet);
  return deserialized;
};

const deserializeNotification = (packet) => {
  const NotificationPacket = getProtoMessages()[packetNames.NOTIFICATION];
  const deserialized = NotificationPacket.decode(packet);
  return deserialized;
};

const verifyPacket = (MessageType, payloadData) => {
  const message = MessageType.verify(payloadData);
  if (message) {
    throw new CustomError(ErrorCodes.SERIALIZE_ERROR, '직렬화 에러');
  }
};

import protoTypeNames from "./proto-type-names.constants.js";
import packetTypes from "./packet-types.constants.js";
import MatchFoundNotification from "../protobuf/classes/notification/match-found-notification.proto.js";

const packetNames = {
  packet: {
    request: protoTypeNames.REQUEST,
    response: protoTypeNames.RESPONSE,
    notification: protoTypeNames.NOTIFICATION,
    // GamePacket: "GamePacket",
  },
  payload: {
    [packetTypes.SIGN_UP_REQUEST]: {
      key: "signUpRequest",
      // class:
    },
    [packetTypes.SIGN_UP_RESPONSE]: {
      key: "signUpResponse",
    },
    [packetTypes.SIGN_IN_REQUEST]: {
      key: "signInRequest",
    },
    [packetTypes.SIGN_IN_RESPONSE]: {
      key: "signInResponse",
    },
    [packetTypes.MATCH_REQUEST]: {
      key: "matchRequest",
      // class:
    },
    [packetTypes.MATCH_FOUND_NOTIFICATION]: {
      key: "matchFoundNotification",
      class: MatchFoundNotification,
    },
    [packetTypes.TOWER_PURCHASE_REQUEST]: {
      key: "",
    },
    [packetTypes.BASE_ATTACKED_REQUEST]: {
      key: "baseHpUpdate",
    },
  },
};

export default packetNames;

// const serialized = serializeRequest(packetType, payload)

// const data = "";

// const RequestPacket = getProtoMessages()[packetNames.packet.request];

// const encoded = RequestPacket.encode({[packetNames.payload[packetType]]: data})

// encode.({signUpRequest: data}

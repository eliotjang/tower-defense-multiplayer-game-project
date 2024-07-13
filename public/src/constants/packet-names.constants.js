import protoTypeNames from "./proto-type-names.constants.js";
import packetTypes from "./packet-types.constants.js";

const packetNames = {
  packet: {
    request: protoTypeNames.request.NAME,
    response: protoTypeNames.response.NAME,
    notification: protoTypeNames.notification.NAME,
  },
  payload: {
    [packetTypes.SIGN_UP_REQUEST]: "signUpRequest",
    [packetTypes.SIGN_UP_RESPONSE]: "signUpResponse",
    [packetTypes.SIGN_IN_REQUEST]: "signInRequest",
    [packetTypes.SIGN_IN_RESPONSE]: "signInResponse",
    [packetTypes.MATCH_REQUEST]: "matchRequest",
    [packetTypes.MATCH_FOUND_NOTIFICATION]: "matchFoundNotification",
    [packetTypes.TOWER_PURCHASE_REQUEST]: "",
    [packetTypes.BASE_ATTACKED_REQUEST]: "baseHpUpdate",
  },
};

export default packetNames;

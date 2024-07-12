import packetTypes from "./packet-types.constants.js";

const dummyHandler = () => {
  // temp
};

const handlerMappings = {
  [packetTypes.SIGN_UP_REQUEST]: {
    handler: dummyHandler,
  },
  [packetTypes.SIGN_IN_REQUEST]: {
    handler: dummyHandler,
  },
  [packetTypes.MATCH_REQUEST]: {
    handler: dummyHandler,
  },
  [packetTypes.BASE_ATTACKED_REQUEST]: {
    handler: dummyHandler, // baseAttackHandler,
  },
};

export default handlerMappings;

import packetTypes from "./packet-types.constants.js";

const dummyHandler = () => {
  // temp
};

const handlerMappings = {
  [packetTypes.SIGN_UP]: {
    handler: dummyHandler,
    // request: "C2S_SignUpRequest", // ?
    // response: "S2C_SignUpResponse",
  },
  [packetTypes.SIGN_IN]: {
    handler: dummyHandler,
    // request: "C2S_SignInRequest",
    // response: "S2C_SignInResponse",
  },
  [packetTypes.MATCH]: {
    handler: dummyHandler,
    // request: "C2S_MatchRequest",
    // response: "S2C_MatchFound",
  },
};

export default handlerMappings;

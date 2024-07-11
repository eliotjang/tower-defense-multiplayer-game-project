import packetTypes from "./packet-types.constants.js";

const protoTypeNames = {
  [packetTypes.SIGN_UP]: {
    request: "C2S_SignUpRequest", // ?
    response: "S2C_SignUpResponse",
  },
  [packetTypes.SIGN_IN]: {
    request: "C2S_SignInRequest",
    response: "S2C_SignInResponse",
  },
};

export default protoTypeNames;

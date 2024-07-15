import packetTypes from '../constants/packet-types.constants.js';
import signUpHandler from './sign-up.handler.js';
import signInHandler from './sign-in.handler.js';
import matchFoundNotificationHandler from './match-found.handler.js';

const dummyHandler = () => {};

const handlerMappings = {
  [packetTypes.SIGN_UP_RESPONSE]: signUpHandler,
  [packetTypes.SIGN_IN_RESPONSE]: signInHandler,
  [packetTypes.MATCH_FOUND_NOTIFICATION]: matchFoundNotificationHandler,

  // ...
};

export const getHandlerByPacketType = (packetType) => {
  return handlerMappings[packetType];
};

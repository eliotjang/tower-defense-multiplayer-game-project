import packetTypes from '../constants/packet-types.constants.js';
import matchFoundNotificationHandler from './match-found.handler.js';
import signInHandler from './sign-in.handler.js';
import { towerNotificationHandler, towerResponseHandler } from './tower.handler.js';

const dummyHandler = () => {};

const handlerMappings = {
  [packetTypes.SIGN_UP_RESPONSE]: dummyHandler,
  [packetTypes.SIGN_IN_RESPONSE]: signInHandler,
  [packetTypes.MATCH_FOUND_NOTIFICATION]: matchFoundNotificationHandler,
  [packetTypes.TOWER_PURCHASE_RESPONSE]: towerResponseHandler,
  [packetTypes.TOWER_PURCHASE_NOTIFICATION]: towerNotificationHandler,

  // ...
};

export const getHandlerByPacketType = (packetType) => {
  return handlerMappings[packetType];
};

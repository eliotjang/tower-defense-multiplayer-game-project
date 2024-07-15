import packetTypes from '../constants/packet-types.constants.js';
import matchFoundNotificationHandler from './match-found.handler.js';
import monsterSpawnNotificationHandler from './monster-spawn.handler.js';
import signInHandler from './sign-in.handler.js';

const dummyHandler = () => {};

const handlerMappings = {
  [packetTypes.SIGN_UP_RESPONSE]: dummyHandler,
  [packetTypes.SIGN_IN_RESPONSE]: signInHandler,
  [packetTypes.MATCH_FOUND_NOTIFICATION]: matchFoundNotificationHandler,
  [packetTypes.MONSTER_SPAWN_NOTIFICATION]: monsterSpawnNotificationHandler,
  // ...
};

export const getHandlerByPacketType = (packetType) => {
  return handlerMappings[packetType];
};

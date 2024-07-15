import { matchRequestHandler } from '../handlers/game.handler.js';
import signInHandler from '../handlers/sign-in.handler.js';
import signUpHandler from '../handlers/sign-up.handler.js';
import { towerAttackRequestHandler } from '../handlers/tower.handler.js';
import packetTypes from './packet-types.constants.js';

const dummyHandler = () => {
  // temp
};

const handlerMappings = {
  [packetTypes.SIGN_UP_REQUEST]: {
    handler: signUpHandler,
  },
  [packetTypes.SIGN_IN_REQUEST]: {
    handler: signInHandler,
  },
  [packetTypes.MATCH_REQUEST]: {
    handler: matchRequestHandler,
  },
  [packetTypes.BASE_ATTACKED_REQUEST]: {
    handler: dummyHandler, // baseAttackHandler,
  },
};

export default handlerMappings;

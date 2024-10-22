import baseHandler from '../handlers/base.handler.js';
import gameEndHandler from '../handlers/game-end.handler.js';
import { matchRequestHandler } from '../handlers/game.handler.js';
import { monsterKillRequestHandler, monsterSpawnHandler } from '../handlers/monster.handler.js';
import signInHandler from '../handlers/sign-in.handler.js';
import { towerAttackRequestHandler } from '../handlers/tower.handler.js';
import packetTypes from './packet-types.constants.js';
import { purchaseTowerHandler } from '../handlers/tower.handler.js';
import signUpHandler from '../handlers/sign-up.handler.js';
import chattingRequestHandler from '../handlers/chatting.handler.js';
import { stateSyncRequestHandler } from '../handlers/state-sync.handler.js';

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
  [packetTypes.TOWER_ATTACK_REQUEST]: {
    handler: towerAttackRequestHandler,
  },
  [packetTypes.BASE_ATTACKED_REQUEST]: {
    handler: baseHandler,
  },
  [packetTypes.GAME_END_REQUEST]: {
    handler: gameEndHandler,
  },
  [packetTypes.TOWER_PURCHASE_REQUEST]: {
    handler: purchaseTowerHandler,
  },
  [packetTypes.MONSTER_SPAWN_REQUEST]: {
    handler: monsterSpawnHandler,
  },
  [packetTypes.CHATTING_REQUEST]: {
    handler: chattingRequestHandler,
  },
  [packetTypes.MONSTER_KILL_REQUEST]: {
    handler: monsterKillRequestHandler,
  },
  [packetTypes.STATE_SYNC_REQUEST]: {
    handler: stateSyncRequestHandler,
  },
};

export default handlerMappings;

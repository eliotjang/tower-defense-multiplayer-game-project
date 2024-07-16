import chattingRequestHandler from '../../../src/handlers/chatting.handler.js';
import signUpHandler from '../../../src/handlers/sign-up.handler.js';
import packetTypes from '../constants/packet-types.constants.js';
import baseHandler from './base.handler.js';
import chattingNotificationHandler from './chatting.handler.js';
import gameOverHandler from './game-over.handler.js';
import matchFoundNotificationHandler from './match-found.handler.js';
import monsterKillNotificationHandler from './monster-kill.handler.js';
import monsterSpawnNotificationHandler from './monster-spawn.handler.js';
import signInHandler from './sign-in.handler.js';
import towerAttackNotificationHandler from './tower-attack.handler.js';
import { towerNotificationHandler, towerResponseHandler } from './tower.handler.js';

const handlerMappings = {
  [packetTypes.SIGN_UP_RESPONSE]: signUpHandler,
  [packetTypes.SIGN_IN_RESPONSE]: signInHandler,
  [packetTypes.MATCH_FOUND_NOTIFICATION]: matchFoundNotificationHandler,
  [packetTypes.TOWER_ATTACK_NOTIFICATION]: towerAttackNotificationHandler,
  [packetTypes.TOWER_PURCHASE_RESPONSE]: towerResponseHandler,
  [packetTypes.TOWER_PURCHASE_NOTIFICATION]: towerNotificationHandler,
  [packetTypes.MONSTER_SPAWN_NOTIFICATION]: monsterSpawnNotificationHandler,
  [packetTypes.MONSTER_KILL_NOTIFICATION]: monsterKillNotificationHandler,
  [packetTypes.BASE_ATTACKED_RESPONSE]: baseHandler,
  [packetTypes.GAME_OVER_NOTIFICATION]: gameOverHandler,
  [packetTypes.CHATTING_NOTIFICATION]: chattingNotificationHandler,
};

export const getHandlerByPacketType = (packetType) => {
  return handlerMappings[packetType];
};

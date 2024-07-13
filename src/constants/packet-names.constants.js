import protoTypeNames from './proto-type-names.constants.js';
import packetTypes from './packet-types.constants.js';

const packetNames = {
  packet: {
    request: protoTypeNames.REQUEST,
    response: protoTypeNames.RESPONSE,
    notification: protoTypeNames.NOTIFICATION,
  },
  payload: {
    [packetTypes.SIGN_UP_REQUEST]: 'signUpRequest',
    [packetTypes.SIGN_UP_RESPONSE]: 'signUpResponse',
    [packetTypes.SIGN_IN_REQUEST]: 'signInRequest',
    [packetTypes.SIGN_IN_RESPONSE]: 'signInResponse',
    [packetTypes.MATCH_REQUEST]: 'matchRequest',
    [packetTypes.MATCH_FOUND_NOTIFICATION]: 'matchFoundNotification',
    [packetTypes.TOWER_PURCHASE_REQUEST]: 'towerPurchaseRequest',
    [packetTypes.TOWER_PURCHASE_RESPONSE]: 'towerPurchseResponse',
    [packetTypes.TOWER_PURCHASE_NOTIFICATION]: 'towerPurchaseNotification',
    [packetTypes.TOWER_ATTACK_REQUEST]: 'towerAttackRequest',
    [packetTypes.TOWER_ATTACK_RESPONSE]: 'towerAttackResponse',
    [packetTypes.TOWER_ATTACK_NOTIFICATION]: 'towerAttackNotification',
    [packetTypes.MONSTER_KILL_REQUEST]: 'monsterKillRequest',
    [packetTypes.MONSTER_KILL_RESPONSE]: 'monsterKillResponse',
    [packetTypes.MONSTER_KILL_NOTIFICATION]: 'monsterKillNotification',
    [packetTypes.MONSTER_SPAWN_REQUEST]: 'monsterSpawnRequest',
    [packetTypes.MONSTER_SPAWN_RESPONSE]: 'monsterSpawnResponse',
    [packetTypes.MONSTER_SPAWN_NOTIFICATION]: 'monsterSpawnNotification',
    [packetTypes.BASE_ATTACKED_REQUEST]: 'baseAttackedRequest',
    [packetTypes.BASE_ATTACKED_RESPONSE]: 'baseAttackedResponse',
    [packetTypes.GAME_OVER_NOTIFICATION]: 'gameOverNotification',
    [packetTypes.GAME_END_REQUEST]: 'gameEndRequest',
  },
};

export default packetNames;

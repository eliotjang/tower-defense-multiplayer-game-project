import packetTypes from './packet-types.constants.js';

export const packetNames = {
  request: {
    NAME: 'RequestPacket',
    PATH: './src/protobuf/requests.proto',
  },
  response: {
    NAME: 'ResponsePacket',
    PATH: './src/protobuf/responses.proto',
  },
  notification: {
    NAME: 'NotificationPacket',
    PATH: './src/protobuf/notifications.proto',
  },
};

const packetPayloadKeyNames = {
  [packetTypes.SIGN_UP_REQUEST]: 'signUpRequest',
  [packetTypes.SIGN_UP_RESPONSE]: 'signUpResponse',
  [packetTypes.SIGN_IN_REQUEST]: 'signInRequest',
  [packetTypes.SIGN_IN_RESPONSE]: 'signInResponse',
  [packetTypes.MATCH_REQUEST]: 'matchRequest',
  [packetTypes.MATCH_FOUND_NOTIFICATION]: 'matchFoundNotification',
  [packetTypes.TOWER_PURCHASE_REQUEST]: 'towerPurchaseRequest',
  [packetTypes.TOWER_PURCHASE_RESPONSE]: 'towerPurchaseResponse',
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
};

const packetMessageTypeNames = Object.fromEntries(
  Object.entries(packetTypes).map(([key, value]) => {
    if (key.endsWith('RESPONSE')) {
      return [value, packetNames.response.NAME];
    } else if (key.endsWith('REQUEST')) {
      return [value, packetNames.request.NAME];
    }
    return [value, packetNames.notification.NAME];
  })
);

export const getMessageNameByPacketType = (packetType) => packetMessageTypeNames[packetType];

export const getPayloadKeyNameByPacketType = (packetType) => {
  return packetPayloadKeyNames[packetType];
};

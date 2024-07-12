import { matchRequestHandler } from './game.handler.js';

const packetTypeMappings = {
  // 1: signUpHandler,
  // 2: loginHandler,
  3: matchRequestHandler,
  // 4: matchFoundHandler,
  // 5: stateSyncHandler,
  // 10: purchaseTowerHandler,
  // 11: targetPurchaseTowerHandler,
  // 12: towerAttackHandler,
  // 13: targetTowerAttackHandler,
  // 20: monsterSpawnHandler,
  // 21: targetMonsterSpawnHandler,
  // 22: killMonsterHandler,
  // 23: targetKillMonsterHandler,
  // 30: baseAttackedHandler,
  // 31: updateBaseHpHandler,
  // 32: gameOverHandler,
  // 33: gameEndHandler,
  // 40: chattingHandler,
};

export default packetTypeMappings;

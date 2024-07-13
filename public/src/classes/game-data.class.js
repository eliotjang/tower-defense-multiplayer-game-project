class GameData {
  constructor() {
    if (GameData.instance) {
      return GameData.instance;
    }
    this.towerCost = 0; // 타워 구입 비용
    this.monsterSpawnInterval = 0; // 몬스터 생성 주기
    GameData.instance = this;
  }

  static getInstance() {
    return GameData.instance;
  }
}

export default GameData;

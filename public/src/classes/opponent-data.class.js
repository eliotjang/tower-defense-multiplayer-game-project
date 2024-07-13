class OpponentData {
  constructor() {
    if (OpponentData.instance) {
      return OpponentData.instance;
    }
    this.opponentBase = null; // 상대방 기지 객체
    this.opponentMonsterPath = null; // 상대방 몬스터 경로
    this.opponentInitialTowerCoords = null; // 상대방 초기 타워 좌표
    this.opponentBasePosition = null; // 상대방 기지 좌표
    this.opponentMonsters = []; // 상대방 몬스터 목록
    this.opponentTowers = []; // 상대방 타워 목록
    OpponentData.instance = this;
  }

  /**
   *
   * @returns {OpponentData} singleton instance
   */
  static getInstance() {
    if (OpponentData.instance) {
      return OpponentData.instance;
    }
    return new OpponentData();
  }
}

export default OpponentData;

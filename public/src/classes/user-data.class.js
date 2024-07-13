class UserData {
  constructor() {
    if (UserData.instance) {
      return UserData.instance;
    }
    this.userGold = 0; // 유저 골드
    this.base = null; // 기지 객체
    this.baseHp = 0; // 기지 체력
    this.monsterLevel = 0; // 몬스터 레벨
    this.monsterPath = null; // 몬스터 경로
    this.initialTowerCoords = null; // 초기 타워 좌표
    this.basePosition = null; // 기지 좌표
    this.monsters = []; // 유저 몬스터 목록
    this.towers = []; // 유저 타워 목록
    this.score = 0; // 게임 점수
    this.highScore = 0; // 기존 최고 점수
    UserData.instance = this;
  }

  static getInstance() {
    return UserData.instance;
  }
}

export default UserData;

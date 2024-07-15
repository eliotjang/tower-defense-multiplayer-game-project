class GameData {
  constructor() {
    if (GameData.instance) {
      return GameData.instance;
    }
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = canvas.getContext('2d');

    this.opponentCanvas = document.getElementById('opponentCanvas');
    this.opponentCtx = opponentCanvas.getContext('2d');

    this.progressBarContainer = document.getElementById('progressBarContainer');
    this.progressBarMessage = document.getElementById('progressBarMessage');
    this.progressBar = document.getElementById('progressBar');
    this.loader = document.getElementsByClassName('loader')[0];

    this.buyTowerButton = document.createElement('button');

    this.bgm = null;

    // ---------------
    this.isInitGame = false;

    this.towerCost = 0; // 타워 구입 비용
    this.monsterSpawnInterval = 0; // 몬스터 생성 주기

    this.init();

    GameData.instance = this;
  }

  /**
   *
   * @returns {GameData} singleton instance
   */
  static getInstance() {
    if (GameData.instance) {
      return GameData.instance;
    }
    return new GameData();
  }

  init() {
    this.buyTowerButton.textContent = '타워 구입';
    this.buyTowerButton.style.position = 'absolute';
    this.buyTowerButton.style.top = '10px';
    this.buyTowerButton.style.right = '10px';
    this.buyTowerButton.style.padding = '10px 20px';
    this.buyTowerButton.style.fontSize = '16px';
    this.buyTowerButton.style.cursor = 'pointer';
    this.buyTowerButton.style.display = 'none';

    this.buyTowerButton.addEventListener('click', placeNewTower);
  }
}

export default GameData;

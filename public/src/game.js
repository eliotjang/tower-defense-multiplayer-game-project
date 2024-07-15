import { Base } from './base.js';
import packetTypes from './constants/packet-types.constants.js';
import { Monster } from './monster.js';
import Socket from './socket.js';
import { Tower } from './tower.js';

const gameConstants = {
  NUM_OF_MONSTERS: 5,
};

class Game {
  constructor(socket) {
    if (Game.instance) {
      return Game.instance;
    }
    this.initGameComponents();
    this.initGameData();
    this.initUserData();
    this.initOpponentData();
    this.initImages();
    this.socket = socket;

    Promise.all([
      new Promise((resolve) => (this.backgroundImage.onload = resolve)),
      new Promise((resolve) => (this.towerImage.onload = resolve)),
      new Promise((resolve) => (this.baseImage.onload = resolve)),
      new Promise((resolve) => (this.pathImage.onload = resolve)),
      ...this.monsterImages.map((img) => new Promise((resolve) => (img.onload = resolve))),
    ]).then(() => {
      //
    });

    Game.instance = this;
  }

  /**
   *
   * @returns {Game} singleton instance
   */
  static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  initGameComponents() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.opponentCanvas = document.getElementById('opponentCanvas');
    this.opponentCtx = this.opponentCanvas.getContext('2d');

    this.progressBarContainer = document.getElementById('progressBarContainer');
    this.progressBarMessage = document.getElementById('progressBarMessage');
    this.progressBar = document.getElementById('progressBar');
    this.loader = document.getElementsByClassName('loader')[0];

    this.bgm = null;

    this.buyTowerButton = document.createElement('button');

    this.buyTowerButton.textContent = '타워 구입';
    this.buyTowerButton.style.position = 'absolute';
    this.buyTowerButton.style.top = '10px';
    this.buyTowerButton.style.right = '10px';
    this.buyTowerButton.style.padding = '10px 20px';
    this.buyTowerButton.style.fontSize = '16px';
    this.buyTowerButton.style.cursor = 'pointer';
    this.buyTowerButton.style.display = 'none';

    this.buyTowerButton.addEventListener('click', this.placeNewTower.bind(this));
    document.body.appendChild(this.buyTowerButton);
  }

  initGameData() {
    this.isInitGame = false;

    this.towerCost = 0; // 타워 구입 비용
    this.monsterSpawnInterval = 0; // 몬스터 생성 주기
  }

  initUserData() {
    this.userId = null;

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
    this.towersIndex = 0;
  }

  initOpponentData() {
    this.opponentBase = null; // 상대방 기지 객체
    this.opponentMonsterPath = null; // 상대방 몬스터 경로
    this.opponentInitialTowerCoords = null; // 상대방 초기 타워 좌표
    this.opponentBasePosition = null; // 상대방 기지 좌표
    this.opponentMonsters = []; // 상대방 몬스터 목록
    this.opponentTowers = []; // 상대방 타워 목록
  }

  initImages() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'images/bg.webp';

    this.towerImage = new Image();
    this.towerImage.src = 'images/tower.png';

    this.baseImage = new Image();
    this.baseImage.src = 'images/base.png';

    this.pathImage = new Image();
    this.pathImage.src = 'images/path.png';

    this.monsterImages = [];
    for (let i = 1; i <= gameConstants.NUM_OF_MONSTERS; i++) {
      const img = new Image();
      img.src = `images/monster${i}.png`;
      this.monsterImages.push(img);
    }
  }

  initMap() {
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height); // 배경 이미지 그리기
    this.drawPath(this.monsterPath, this.ctx);
    this.drawPath(this.opponentMonsterPath, this.opponentCtx);
    this.placeInitialTowers(this.initialTowerCoords, this.towers, this.ctx); // 초기 타워 배치
    this.placeInitialTowers(this.opponentInitialTowerCoords, this.opponentTowers, this.opponentCtx); // 상대방 초기 타워 배치
    this.placeBase(this.basePosition, true);
    this.placeBase(this.opponentBasePosition, false);
  }

  drawPath(path, context) {
    const segmentLength = 10; // 몬스터 경로 세그먼트 길이
    const imageWidth = 30; // 몬스터 경로 이미지 너비
    const imageHeight = 30; // 몬스터 경로 이미지 높이
    const gap = 3; // 몬스터 경로 이미지 겹침 방지를 위한 간격

    for (let i = 0; i < path.length - 1; i++) {
      const startX = path[i].x;
      const startY = path[i].y;
      const endX = path[i + 1].x;
      const endY = path[i + 1].y;

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 피타고라스 정리로 두 점 사이의 거리를 구함 (유클리드 거리)
      const angle = Math.atan2(deltaY, deltaX); // 두 점 사이의 각도를 tan-1(y/x)로 구해야 함 (자세한 것은 역삼각함수 참고): 삼각함수는 변의 비율! 역삼각함수는 각도를 구하는 것!

      for (let j = gap; j < distance - gap; j += segmentLength) {
        const x = startX + Math.cos(angle) * j; // 다음 이미지 x좌표 계산(각도의 코사인 값은 x축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 x축 좌표를 구함)
        const y = startY + Math.sin(angle) * j; // 다음 이미지 y좌표 계산(각도의 사인 값은 y축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 y축 좌표를 구함)
        this.drawRotatedImage(this.pathImage, x, y, imageWidth, imageHeight, angle, context);
      }
    }
  }

  drawRotatedImage(image, x, y, width, height, angle, context) {
    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate(angle);
    context.drawImage(image, -width / 2, -height / 2, width, height);
    context.restore();
  }

  getRandomPositionNearPath(maxDistance) {
    const segmentIndex = Math.floor(Math.random() * (this.monsterPath.length - 1));
    const startX = this.monsterPath[segmentIndex].x;
    const startY = this.monsterPath[segmentIndex].y;
    const endX = this.monsterPath[segmentIndex + 1].x;
    const endY = this.monsterPath[segmentIndex + 1].y;

    const t = Math.random();
    const posX = startX + t * (endX - startX);
    const posY = startY + t * (endY - startY);

    const offsetX = (Math.random() - 0.5) * 2 * maxDistance;
    const offsetY = (Math.random() - 0.5) * 2 * maxDistance;

    return {
      x: posX + offsetX,
      y: posY + offsetY,
    };
  }

  placeInitialTowers(initialTowerCoords, initialTowers, context) {
    initialTowerCoords.forEach((towerCoords) => {
      const tower = new Tower(towerCoords.x, towerCoords.y);
      initialTowers.push(tower);
      tower.draw(context, this.towerImage);
    });
  }

  placeNewTower() {
    // 타워를 구입할 수 있는 자원이 있을 때 타워 구입 후 랜덤 배치
    // if (this.userGold < this.towerCost) {
    // alert('골드가 부족합니다.');
    // return;
    // }
    // console.log('11:', this.userId);
    // console.log('22:', this.getRandomPositionNearPath);
    const { x, y } = this.getRandomPositionNearPath(200);
    // const tower = new Tower(x, y, towerCost);
    const payload = {
      x,
      y,
      userGold: this.userGold,
      userId: this.userId,
      towerCost: this.towerCost,
      index: this.towersIndex,
    };
    // console.log(payload);
    Socket.sendEventProto(packetTypes.TOWER_PURCHASE_REQUEST, payload);
    this.towersIndex = this.nextIndex();
    // console.log(this.towersIndex);
    //towers.push(tower);
    // tower.draw(ctx, towerImage);
    // index++;
  }
  nextIndex() {
    return ++this.towersIndex;
  }

  placeBase(position, isPlayer) {
    if (isPlayer) {
      this.base = new Base(position.x, position.y, this.baseHp);
      this.base.draw(this.ctx, this.baseImage);
    } else {
      // this.highScore = new Base(position.x, position.y, this.baseHp);
      // this.highScore.draw(this.opponentCtx, this.baseImage, true);
    }
  }

  spawnMonster() {
    const newMonster = new Monster(this.monsterPath, this.monsterImages, this.monsterLevel);
    this.monsters.push(newMonster);

    // TODO. 서버로 몬스터 생성 이벤트 전송
    const monsterData = {
      path: newMonster.path,
      level: newMonster.level,
      monsterNumber: newMonster.monsterNumber,
    };

    Socket.sendEventProto(packetTypes.MONSTER_SPAWN_REQUEST, monsterData);
  }

  gameLoop() {
    // 렌더링 시에는 항상 배경 이미지부터 그려야 합니다! 그래야 다른 이미지들이 배경 이미지 위에 그려져요!
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height); // 배경 이미지 다시 그리기
    this.drawPath(this.monsterPath, this.ctx); // 경로 다시 그리기

    this.ctx.font = '25px Times New Roman';
    this.ctx.fillStyle = 'skyblue';
    this.ctx.fillText(`최고 기록: ${this.highScore}`, 100, 50); // 최고 기록 표시
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`점수: ${this.score}`, 100, 100); // 현재 스코어 표시
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillText(`골드: ${this.userGold}`, 100, 150); // 골드 표시
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`현재 레벨: ${this.monsterLevel}`, 100, 200); // 최고 기록 표시

    // 타워 그리기 및 몬스터 공격 처리
    this.towers.forEach((tower) => {
      tower.draw(this.ctx, this.towerImage);
      tower.updateCooldown();
      this.monsters.forEach((monster) => {
        const distance = Math.sqrt(Math.pow(tower.x - monster.x, 2) + Math.pow(tower.y - monster.y, 2));
        if (distance < tower.range) {
          tower.attack(monster);
        }
      });
    });

    // 몬스터가 공격을 했을 수 있으므로 기지 다시 그리기
    this.base.draw(this.ctx, this.baseImage);

    for (let i = this.monsters.length - 1; i >= 0; i--) {
      const monster = this.monsters[i];
      if (monster.hp > 0) {
        const Attacked = monster.move();
        monster.draw(this.ctx);

        if (Attacked) {
          const attackedSound = new Audio('sounds/attacked.wav');
          attackedSound.volume = 0.3;
          attackedSound.play();
          // TODO. 몬스터가 기지를 공격했을 때 서버로 이벤트 전송
          this.monsters.splice(i, 1);
        }
      } else {
        // TODO. 몬스터 사망 이벤트 전송
        this.monsters.splice(i, 1);
      }
    }

    // 상대방 게임 화면 업데이트
    this.opponentCtx.drawImage(this.backgroundImage, 0, 0, this.opponentCanvas.width, this.opponentCanvas.height);
    this.drawPath(this.opponentMonsterPath, this.opponentCtx); // 상대방 경로 다시 그리기

    this.opponentTowers.forEach((tower) => {
      tower.draw(this.opponentCtx, this.towerImage);
      tower.updateCooldown(); // 적 타워의 쿨다운 업데이트
    });

    this.opponentMonsters.forEach((monster) => {
      monster.move();
      monster.draw(this.opponentCtx, false);
    });

    // this.highScore.draw(this.opponentCtx, this.baseImage, true);

    requestAnimationFrame(this.gameLoop.bind(this)); // 지속적으로 다음 프레임에 gameLoop 함수 호출할 수 있도록 함
  }

  initGame() {
    if (this.isInitGame) {
      return;
    }
    this.bgm = new Audio('sounds/bgm.mp3');
    this.bgm.loop = true;
    this.bgm.volume = 0;
    this.bgm.play();

    this.initMap(); // 맵 초기화 (배경, 몬스터 경로 그리기)

    this.monsterSpawnInterval = 3000;
    setInterval(this.spawnMonster.bind(this), this.monsterSpawnInterval); // 설정된 몬스터 생성 주기마다 몬스터 생성
    this.gameLoop(); // 게임 루프 최초 실행
    this.isInitGame = true;
  }
}

export default Game;

// let serverSocket;
// let sendEvent;

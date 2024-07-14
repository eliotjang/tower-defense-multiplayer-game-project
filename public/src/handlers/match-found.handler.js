import Game from '../classes/game.class.js';

const game = Game.getInstance();

const matchFoundNotificationHandler = ({ packetType, payload }) => {
  console.log('matchFoundHandler');

  game.progressBar.textContent = '게임이 3초 뒤에 시작됩니다.';
  game.baseHp = 200;
  for (const key in payload) {
    if (key === game.userId) {
      game.basePosition = payload[key].basePosition;
      game.initialTowerCoords = payload[key].initialTowerCoords;
      game.monsterPath = payload[key].monsterPath;
      continue;
    } else {
      game.opponentBasePosition = payload[key].basePosition;
      game.opponentInitialTowerCoords = payload[key].initialTowerCoords;
      game.opponentMonsterPath = payload[key].monsterPath;
    }
  }

  // console.log(monsterPath);
  // console.log(opponentMonsterPath);

  let progressValue = 0;
  const progressInterval = setInterval(() => {
    progressValue += 10;
    game.progressBar.value = progressValue;
    game.progressBar.style.display = 'block';
    game.loader.style.display = 'none';

    if (progressValue >= 100) {
      clearInterval(progressInterval);
      game.progressBarContainer.style.display = 'none';
      game.progressBar.style.display = 'none';
      game.buyTowerButton.style.display = 'block';
      game.canvas.style.display = 'block';
      game.opponentCanvas.style.display = 'block';

      // TODO. 유저 및 상대방 유저 데이터 초기화
      if (!game.isInitGame) {
        game.initGame();
      }
    }
  }, 300);
};

export default matchFoundNotificationHandler;

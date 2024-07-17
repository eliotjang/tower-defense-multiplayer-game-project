// gameAssets.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/errors/customError.js';
import { ErrorCodes } from '../utils/errors/errorCodes.js';

// import.meta.url은 현재 모듈의 URL을 나타내는 문자열
// fileURLToPath는 URL 문자열을 파일 시스템의 경로로 변환

// 현재 파일의 절대 경로. 이 경로는 파일의 이름을 포함한 전체 경로
const __filename = fileURLToPath(import.meta.url);

// path.dirname() 함수는 파일 경로에서 디렉토리 경로만 추출 (파일 이름을 제외한 디렉토리의 전체 경로)
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, '../../assets');

let gameAssets = {}; // 전역함수로 선언

const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

export const loadGameAssets = async () => {
  try {
    // 읽을 JSON 데이터 테이블 작성
    const [game] = await Promise.all([readFileAsync('game.json')]);
    gameAssets = { game };
    console.log('게임 에셋 로드 성공');
    return gameAssets;
  } catch (error) {
    throw new CustomError(ErrorCodes.GAME_ASSETS_LOAD_ERROR, '게임 에셋 로드 실패');
  }
};

export const getGameAssets = () => {
  return gameAssets;
};

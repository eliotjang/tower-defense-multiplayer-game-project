import { v4 as uuidv4 } from 'uuid';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { transformCase } from '../../utils/transformCase.js';
import caseTypes from '../../constants/case.constants.js';
import { formatDate } from '../../utils/dateFormatter.js';

export const findUserByUserId = async (userId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_USER_ID, [userId]);
  return transformCase(rows[0], caseTypes.CAMEL_CASE);
};

export const findUserByUUID = async (uuid) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_UUID, [uuid]);
  return transformCase(rows[0], caseTypes.CAMEL_CASE);
};

export const createUser = async (userId, password) => {
  const uuid = uuidv4();
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [userId, uuid, password]);
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_USER_ID, [userId]);
  return transformCase(rows[0], caseTypes.CAMEL_CASE);
};

export const updateUserLogin = async (userId) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [userId]);
};

/**
 *
 * @param {String} id 매치 기록의 id
 * @param {String} firstUserUuid 첫 번쨰 유저의 uuid
 * @param {String} secondUserUuid 두 번쨰 유저의 uuid
 * @param {Long} startTime 매치 시작 타임스탬프 Date.now()
 * @param {Long} endTime 매치 종료 타임스탬프 Date.now()
 * @param {Int} score 승리 플레이어의 점수
 */
export const createMatchHistory = async (firstUserUuid, secondUserUuid, startTime, endTime, score) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.CREATE_MATCH_HISTORY, [
    firstUserUuid,
    secondUserUuid,
    formatDate(new Date(startTime)),
    formatDate(new Date(endTime)),
    score,
  ]);
  return transformCase(rows[0], caseTypes.CAMEL_CASE);
};

/**
 *
 * @returns {number} high score
 */
export const getHighScore = async () => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.GET_HIGH_SCORE);
  return rows[0].score;
};

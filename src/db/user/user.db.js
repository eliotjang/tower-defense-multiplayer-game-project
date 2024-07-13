import { v4 as uuidv4 } from 'uuid';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserByUserId = async (userId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_USER_ID, [userId]);
  return toCamelCase(rows[0]);
};

export const findUserByUUID = async (uuid) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_UUID, [uuid]);
  return toCamelCase(rows[0]);
};

export const createUser = async (userId, password) => {
  const uuid = uuidv4();
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [userId, uuid, password]);
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_USER_ID, [userId]);
  return toCamelCase(rows[0]);
};

export const updateUserLogin = async (userId) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [userId]);
};

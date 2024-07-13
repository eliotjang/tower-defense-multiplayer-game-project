export const SQL_QUERIES = {
  FIND_USER_BY_USER_ID: 'SELECT * FROM user WHERE user_id = ?',
  FIND_USER_BY_UUID: 'SELECT * FROM user WHERE uuid = ?',
  CREATE_USER: 'INSERT INTO user (user_id, uuid, password) VALUES (?, ?, ?)',
  UPDATE_USER_LOGIN: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?',
};

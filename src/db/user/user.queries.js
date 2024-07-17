const userTables = {
  user: 'user',
  matchHistory: 'match_history',
};

const createMatchHistoryQuery = `
  INSERT INTO ${userTables.matchHistory} (winner_uuid, loser_uuid, start_time, end_time, score)
    VALUES (?, ?, ?, ?, ?)
`;

const getHighScoreQuery = `
  SELECT score
  FROM ${userTables.matchHistory}
  ORDER BY 1 DESC
  LIMIT 1
`;

export const SQL_QUERIES = {
  FIND_USER_BY_USER_ID: `SELECT * FROM ${userTables.user} WHERE user_id = ?`,
  FIND_USER_BY_UUID: `SELECT * FROM ${userTables.user} WHERE uuid = ?`,
  CREATE_USER: `INSERT INTO ${userTables.user} (user_id, uuid, password) VALUES (?, ?, ?)`,
  UPDATE_USER_LOGIN: `UPDATE ${userTables.user} SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?`,
  CREATE_MATCH_HISTORY: createMatchHistoryQuery,
  GET_HIGH_SCORE: getHighScoreQuery,
};

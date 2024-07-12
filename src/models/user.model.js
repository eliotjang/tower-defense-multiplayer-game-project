// 서버 메모리에 유저의 세션(소켓ID)을 저장
// 이때 유저는 객체 형태로 저장
// { userId: string; uuid: string; socketId: string };

const users = [];
const players = [];

export const addUser = async (user) => {
  users.push(user);
};

// 유저 삭제
export const removeUser = async (uuid) => {
  const index = users.findIndex((user) => user.uuid === uuid);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// 유저 조회
export const findUser = async (uuid) => {
  const index = users.findIndex((user) => user.uuid === uuid);
  if (index != -1) {
    return users[index];
  }
};

// 유저 아이디로 유저 조회
export const findUserByUserName = async (username) => {
  const index = users.findIndex((user) => user.username === username);
  if (index != -1) {
    return users[index];
  }
};

// 전체 유저 조회
export const getUsers = async () => {
  return users;
};

// 플레이어 추가
export const addPlayers = async (player) => {
  players.push(player);
};

// 플레이어 삭제
export const removePlayer = async (uuid) => {
  const index = users.findIndex((user) => user.uuid === uuid);
  if (index !== -1) {
    return players.splice(index, 1)[0];
  }
};

// 플레이어 유저 아이디로 플레이어 조회
export const findPlayerByUserId = async (userId) => {
  const index = players.findIndex((player) => player.userId === userId);
  if (index != -1) {
    return players[index];
  }
};

// 전체 유저 조회
export const getPlayers = async () => {
  return players;
};

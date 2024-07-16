import User from '../models/user.model.js';

const userSessions = [];
const userSessionsObj = {};

export const userSessionsManager = {
  addUser: function (uuid, socket) {
    userSessions.push(new User(uuid, socket));
    console.log('userSessions:', userSessions);
  },
  updateUserSocket: function (uuid, socket) {
    const user = userSessions.find((user) => user.uuid === uuid);
    if (!user) {
      return false;
    }
    user.socket = socket;
  },
  removeUserByUuid: function (uuid) {
    const index = userSessions.findIndex((user) => user.gameId === uuid);
    if (index === -1) {
      return false;
    }
    userSessions.splice(index, 1);
    return true;
  },
};

export const userSessionsObjManager = {
  addUser: function (uuid, socket) {
    if (userSessionsObj[uuid]) {
      userSessionsObj[uuid].socket = socket;
    } else {
      userSessionsObj[uuid] = new User(uuid, socket);
    }
    console.log('userSessions:', userSessionsObj);
    return userSessionsObj[uuid];
  },
  getUserByUuid: function (uuid) {
    return userSessionsObj[uuid];
  },
  removeUserByUuid: function (uuid) {
    delete userSessionsObj[uuid];
  },
};

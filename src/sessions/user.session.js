import User from '../models/user.model.js';

const userSessions = {};

export const userSessionsManager = {
  addUser: function (uuid, socket) {
    if (userSessions[uuid]) {
      userSessions[uuid].socket = socket;
    } else {
      userSessions[uuid] = new User(uuid, socket);
    }
    return userSessions[uuid];
  },
  getUserByUuid: function (uuid) {
    return userSessions[uuid];
  },
  removeUserByUuid: function (uuid) {
    delete userSessions[uuid];
  },
};

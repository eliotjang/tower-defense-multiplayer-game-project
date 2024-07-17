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
  getUserBySocket: function (socket) {
    if (userSessions[socket.uuid]) {
      return userSessions[socket.uuid];
    }
    this.addUser(socket.uuid, socket);
  },
  getUserByUuid: function (uuid) {
    return userSessions[uuid];
  },
  removeUserByUuid: function (uuid) {
    delete userSessions[uuid];
  },
};

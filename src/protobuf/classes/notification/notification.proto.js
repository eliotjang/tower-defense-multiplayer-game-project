class NotificationPacket {
  /**
   *
   * @param {String} message
   * @param {*} payload
   */
  constructor(message, payload) {
    this.timestamp = Date.now();
    this.message = message;
    this.payload = payload;
  }
}

export default NotificationPacket;

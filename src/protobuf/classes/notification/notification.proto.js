class Notification {
  constructor(message, payload) {
    this.timestamp = Date.now();
    this.message = message;
    this.payload = payload;
  }
}

export default Notification;

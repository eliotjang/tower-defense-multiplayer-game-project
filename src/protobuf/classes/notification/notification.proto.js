class Notification {
  constructor(packetType, message, payload) {
    this.packetType = packetType;
    this.timestamp = Date.now();
    this.message = message;
    this.payload = payload;
  }
}

export default Notification;

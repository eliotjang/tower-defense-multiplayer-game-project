class RequestPacket {
  constructor(token, clientVersion, payload) {
    this.token = token;
    this.clientVersion = clientVersion;
    this.payload = payload;
  }
}

export default RequestPacket;

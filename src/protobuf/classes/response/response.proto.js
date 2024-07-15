// class ResponsePacket {
//   /**
//    *
//    * @param {Boolean} success
//    * @param {String} message
//    * @param {*} payload
//    * @param {Int} failCode automatically set to 0 if not set
//    */
//   constructor(success, message, payload, failCode) {
//     this.success = success;
//     this.message = message;
//     this.failCode = failCode ?? 0;
//     this.payload = payload;
//   }
// }

// export default ResponsePacket;

class ResponsePacket {
  /**
   *
   * @param {Number} code uint32 성공/실패 코드, 0 = 성공, 나머지는 실패
   * @param {String} message 성공/실패 메세지
   * @param {*} payload payload data, only if code === 0
   */
  constructor(code, message, payload) {
    this.code = code; // 성공 0, 실패시 1 이상
    this.message = message;
    if (code === 0) {
      this.payload = payload;
    }
  }
}

export default ResponsePacket;

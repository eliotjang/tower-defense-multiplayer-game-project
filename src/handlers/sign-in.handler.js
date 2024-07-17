import packetTypes from '../constants/packet-types.constants.js';
import { findUserByUserId } from '../db/user/user.db.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { serialize } from '../utils/packet-serializer.utils.js';
import jwt from 'jsonwebtoken';
import configs from '../config/configs.js';
import bcrypt from 'bcrypt';
import { userSessionsManager } from '../sessions/user.session.js';
import CustomError from '../utils/errors/customError.js';
import { ErrorCodes, SuccessCodes } from '../utils/errors/errorCodes.js';

const signInHandler = async (socket, userId, packetType, payload, io) => {
  try {
    /// 아이디/비번 체크
    const { id, password } = payload;
    const userDB = await findUserByUserId(id);
    if (!userDB) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유효하지 않은 유저입니다.');
    }
    if (!(await bcrypt.compare(password, userDB.password))) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유효하지 않은 유저입니다.');
    }
    // sign JWT token
    const token = jwt.sign(
      {
        id: userDB.id,
      },
      configs.env.jwtSecret
    );
    socket.uuid = userDB.uuid;

    userSessionsManager.addUser(userDB.uuid, socket);

    const data = new ResponsePacket(SuccessCodes.SUCCESS, '로그인 성공', { token: token, userId: userDB.uuid });
    // console.log(data);
    const packet = serialize(packetTypes.SIGN_IN_RESPONSE, data);
    socket.emit('event', packet);
  } catch (err) {
    console.error('로그인 중 오류 발생', err);
    const errorData = new ResponsePacket(ErrorCodes.REQUEST_NOT_SUCCESS, '로그인 실패');
    const errorPacket = serialize(packetTypes.SIGN_IN_RESPONSE, errorData);
    socket.emit('event', errorPacket);
  }
};

export default signInHandler;

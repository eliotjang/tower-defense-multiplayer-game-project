import packetTypes from '../constants/packet-types.constants.js';
import { createUser, findUserByUserId, updateUserLogin } from '../db/user/user.db.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import CustomError from '../utils/errors/customError.js';
import { ErrorCodes, SuccessCodes } from '../utils/errors/errorCodes.js';
import { serialize } from '../utils/packet-serializer.utils.js';
import bcrypt from 'bcrypt';

const signUpHandler = async (socket, userId, packetType, payload, io) => {
  try {
    const { id, password } = payload;
    if (!id) {
      const responsePacket = new ResponsePacket(ErrorCodes.REQUEST_NOT_SUCCESS, '아이디를 입력하세요');
      const packet = serialize(packetTypes.SIGN_UP_RESPONSE, responsePacket);
      socket.emit('event', packet);
      throw new CustomError(ErrorCodes.MISSING_SIGNUP_FIELDS, '아이디 미입력');
    }
    if (!password) {
      const responsePacket = new ResponsePacket(ErrorCodes.REQUEST_NOT_SUCCESS, '비밀번호를 입력하세요');
      const packet = serialize(packetTypes.SIGN_UP_RESPONSE, responsePacket);
      socket.emit('event', packet);
      throw new CustomError(ErrorCodes.MISSING_SIGNUP_FIELDS, '비밀번호 미입력');
    }

    const isExistUser = await findUserByUserId(id);

    if (isExistUser) {
      const responsePacket = new ResponsePacket(ErrorCodes.REQUEST_NOT_SUCCESS, '이미 존재하는 계정입니다');
      const packet = serialize(packetTypes.SIGN_UP_RESPONSE, responsePacket);
      socket.emit('event', packet);
      throw new CustomError(ErrorCodes.EXISTED_USER, '유저 중복 생성 에러');
    }

    // 배포 직전 활성화 예정
    if (!onlyNumberAndEnglish(id) || id.length < 6) {
      const responsePacket = new ResponsePacket(
        ErrorCodes.REQUEST_NOT_SUCCESS,
        '계정 생성에 실패했습니다. 아이디 및 비밀번호 최소 6자 이상, 영어 소문자 + 숫자 조합'
      );
      const packet = serialize(packetTypes.SIGN_UP_RESPONSE, responsePacket);
      socket.emit('event', packet);
      throw new CustomError(ErrorCodes.REQUEST_NOT_SUCCESS, '아이디 및 비밀번호 조합 설정');
    }
    if (!onlyNumberAndEnglish(password) || password.length < 6) {
      const responsePacket = new ResponsePacket(
        ErrorCodes.REQUEST_NOT_SUCCESS,
        '계정 생성에 실패했습니다. 아이디 및 비밀번호 최소 6자 이상, 영어 소문자 + 숫자 조합'
      );
      const packet = serialize(packetTypes.SIGN_UP_RESPONSE, responsePacket);
      socket.emit('event', packet);
      throw new CustomError(ErrorCodes.REQUEST_NOT_SUCCESS, '아이디 및 비밀번호 조합 설정');
    }

    const hashedPassword = await bcrypt.hash(password, 1);

    let userDB = await findUserByUserId(id);
    if (!userDB) {
      userDB = await createUser(id, hashedPassword);
      console.log('새로운 유저가 DB에 등록되었습니다.');
    } else {
      await updateUserLogin(userDB.userId);
      console.log('기존 유저 정보를 불러옵니다.');
    }

    const responsePacket = new ResponsePacket(SuccessCodes.SUCCESS, '회원가입 완료');

    const packet = serialize(packetTypes.SIGN_UP_RESPONSE, responsePacket);
    socket.emit('event', packet);
  } catch (err) {
    console.error('회원가입 중 오류 발생', err);
    const responsePacket = new ResponsePacket(ErrorCodes.SIGNUP_ERROR, '회원가입 실패');
    const packet = serialize(packetTypes.SIGN_UP_RESPONSE, responsePacket);
    socket.emit('event', packet);
  }
};

export default signUpHandler;

function onlyNumberAndEnglish(str) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

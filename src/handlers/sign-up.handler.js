import configs from '../config/configs.js';
import packetTypes from '../constants/packet-types.constants.js';
import { createUser, findUserByUserId, updateUserLogin } from '../db/user/user.db.js';
import ResponsePacket from '../protobuf/classes/response/response.proto.js';
import { serialize } from '../utils/packet-serializer.utils.js';
import bcrypt from 'bcrypt';

const signUpHandler = async (socket, userId, packetType, payload, io) => {
  try {
    const { id, password } = payload;
    if (!id) {
      throw new Error('아이디를 입력해주세요.');
    }
    if (!password) {
      throw new Error('비밀번호를 입력해주세요.');
    }

    const isExistUser = await findUserByUserId(id);

    if (isExistUser) {
      throw new Error('이미 존재하는 아이디입니다.');
    }

    // 배포 직전 활성화 예정
    // if (!onlyNumberAndEnglish(id) || id.length < 6) {
    //   throw new Error('아이디는 최소 6자 이상이고 영어 소문자와 숫자의 조합이어야 합니다.');
    // }
    // if (!onlyNumberAndEnglish(password) || password.length < 6) {
    //   throw new Error('비밀번호는 최소 6자 이상이고 영어 소문자와 숫자의 조합이어야 합니다.');
    // }

    const hashedPassword = await bcrypt.hash(password, configs.env.saltRounds);

    let userDB = await findUserByUserId(id);
    let message;
    if (!userDB) {
      userDB = await createUser(id, hashedPassword);
      console.log('새로운 유저가 DB에 등록되었습니다.');
      message = '회원가입 완료.';
    } else {
      // 이미 존재하는 id
      // await updateUserLogin(userDB.userId);
      console.log('기존 유저 정보를 불러옵니다.');
      message = '이미 존재하는 회원입니다.';
    }

    const data = new ResponsePacket(0, message);

    const packet = serialize(packetTypes.SIGN_UP_RESPONSE, data);
    socket.emit('event', packet);
  } catch (err) {
    console.error('회원가입 중 오류 발생', err);
    const errorData = new ResponsePacket(1, '회원가입 실패');
    const errorPacket = serialize(packetTypes.SIGN_UP_RESPONSE, errorData);
    socket.emit('event', errorPacket);
  }
};

export default signUpHandler;

function onlyNumberAndEnglish(str) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

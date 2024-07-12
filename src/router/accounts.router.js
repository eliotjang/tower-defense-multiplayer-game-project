import express from 'express';
import { addUser, findUserByUserId } from '../models/user.model.js';
import dotEnv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
// 회원가입, 로그인

dotEnv.config();

const router = express.Router();

const signUp = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    if (!userId) {
      return res.status(400).json({ message: '아이디를 입력해주세요.' });
    }
    if (!password) {
      return res.status(400).json({ message: '비밀번호를 입력해주세요.' });
    }

    const isExistUser = await findUserByUserId(userId); //유저 세션에 이미 존재하는지 확인(나중에 DB로 변경)

    if (isExistUser) {
      return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
    }

    if (!onlyNumberAndEnglish(userId) || userId.length <= 6) {
      return res.status(400).json({ message: '아이디는 최소 6자 이상의 영어 소문자와 숫자의 조합이어야 합니다.' });
    }
    if (!strongPassword(password) || password.length <= 6) {
      return res.status(400).json({ message: '비밀번호는 최소 6자 이상의 영어 소문자와 숫자의 조합이어야 합니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();

    const user = { userId: userId, password: hashedPassword, uuid: uuid };

    addUser(user); //유저 세션에 유저 정보 등록(나중에 DB로 변경)

    return res.status(201).json({ message: '회원가입 완료' });
  } catch (error) {
    res.status(500).json({ message: '회원가입 중 에러가 발생하였습니다.' });
  }
};

const login = async (req, res, next) => {
  //
};

router.post('/signUp', signUp);
router.post('/login', login);

function onlyNumberAndEnglish(str) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}

import configs from '../config/configs.js';
import jwt from 'jsonwebtoken';
import { findUserByUserId } from '../db/user/user.db.js';

export const verifyToken = async (token) => {
  // 토큰 검증
  try {
    const decodedToken = jwt.verify(token, configs.env.jwtSecret);
    const userId = decodedToken.id;

    if (userId === null || typeof userId === 'undefined') {
      throw new Error('토큰 정보가 유효하지 않습니다.');
    }
    const user = await findUserByUserId(userId);

    if (!user) {
      throw new Error('토큰 사용자가 존재하지 않습니다.');
    }
    return user;
  } catch (error) {
    // 실패 시 에러 발생
    switch (error.name) {
      case 'TokenExpiredError':
        throw new Error('토큰이 만료되었습니다.');
      case 'JsonWebTokenError':
        throw new Error('토큰이 조작되었습니다.');
      default:
        throw new Error(error.message);
    }
  }
};

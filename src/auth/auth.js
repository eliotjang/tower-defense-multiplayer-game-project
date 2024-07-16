import configs from '../config/configs.js';
import jwt from 'jsonwebtoken';

export const verifyToken = async (token) => {
  // 토큰 검증
  try {
    const decodedToken = jwt.verify(token, configs.env.jwtSecret);
    const user_id = decodedToken.id;
    console.log(user_id);

    if (!user_id) {
      throw new Error('로그인 정보가 필요합니다');
    }
    const user = await findUserByUserId(user_id);

    if (!user) {
      throw new Error('토큰 사용자가 존재하지 않습니다.');
    }
    next();
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        throw new Error('토큰이 만료되었습니다.');
      case 'JsonWebTokenError':
        throw new Error('토큰이 조작되었습니다.');
      default:
        throw new Error('비정상적인 요청입니다.');
    }
  }
  // 실패 시 에러 발생
};

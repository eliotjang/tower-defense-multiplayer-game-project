import configs from '../config/configs.js';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/errors/customError.js';
import { ErrorCodes } from '../utils/errors/errorCodes.js';

export const verifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, configs.env.jwtSecret);
    const user_id = decodedToken.id;
    console.log(user_id);

    if (!user_id) {
      throw new CustomError(ErrorCodesrrorCodes.MISSING_LOGIN_FIELDS, '로그인 정보 필요');
    }
    const user = await findUserByUserId(user_id);

    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유효하지 않은 유저');
    }
    next();
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        throw new CustomError(ErrorCodes.TOKEN_EXPIRED_ERROR, '토큰 만료');
      case 'JsonWebTokenError':
        throw new CustomError(ErrorCodes.JSON_WEB_TOKEN_ERROR, '토큰 조작');
      default:
        throw new CustomError(ErrorCodes.UNUSUAL_REQUEST, '비정상적인 요청');
    }
  }
};

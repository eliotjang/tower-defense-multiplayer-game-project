import { getProtoMessages } from '../init/proto.init.js';
import { getHandlerByPacketType } from '../handlers/helper.js';
import { matchRequestHandler } from '../handlers/game.handler.js';
import packetTypeMappings from '../handlers/packetTypeMapping.js';
import { deserializeRequest } from '../utils/packet-serializer.utils.js';
import jwt from 'jsonwebtoken';
import configs from '../config/configs.js';
import { findUserByUserName } from '../models/user.model.js';

let userId;

const onData = (io, socket) => async (data) => {
  try {
    // const decoded = deserializeRequest(data);
    // const { packetType, token, clientVersion, payload } = decoded;
    const { packetType, clientVersion, payload } = data;

    // token 검증?
    const token = socket.handshake.auth.token;
    const decodedToken = jwt.verify(token, configs.env.jwtSecret);
    const username = decodedToken.username;

    const user = await findUserByUserName(username); //session 사용중 redis 추가시 수정

    if (!user) {
      throw new Error('토큰 사용자가 존재하지 않습니다.');
    }
    // clientVersion 검증
    // verifyClientVersion(clientVersion);

    // packetType으로 handler 찾기
    // const handler = getHandlerByPacketType(packetType);
    console.log('packetType', packetType);
    // 핸들러 임시 핸들링
    const handler = packetTypeMappings[packetType];
    if (!handler) {
      throw new Error('유효하지 않은 핸들러');
    }

    if (!handler) {
      // 핸들러 없음 (error)
    }

    // 유저 아이디 임시 저장
    if (packetType === 3) {
      uuid = payload.uuid;
    }
    // handler 실행
    await handler(socket, uuid, packetType, payload, io);
  } catch (err) {
    console.error(err); // 임시
    // handleError(socket, err);
  }
};

const verifyClientVersion = (clientVersion) => {
  //
};

export default onData;

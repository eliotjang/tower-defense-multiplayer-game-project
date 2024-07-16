import { getPayloadKeyNameByPacketType, packetNames } from '../constants/proto.constants.js';
import Game from '../game.js';
import { toggleCssClass } from '../utils/toggler.utils.js';

const signInHandler = ({ socket, packetType, payload }) => {
  // div 토글
  toggleCssClass('hide', 'login-buttons-01', 'main-buttons-01');
  alert('로그인 성공!');
  // 토큰 저장
  // console.log('payload.userId : ', payload.userId);
  window.localStorage.setItem('token', payload.token);
  sessionStorage.setItem('userId', payload.userId);
  // socket.uuid = payload.userId;
  // console.log('signInHandler socket.uuid : ', socket.uuid);
};

export default signInHandler;

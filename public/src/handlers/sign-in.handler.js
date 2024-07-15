import { getPayloadKeyNameByPacketType, packetNames } from '../constants/proto.constants.js';
import Game from '../game.js';
import { toggleCssClass } from '../utils/toggler.utils.js';

const signInHandler = ({ socket, packetType, payload }) => {
  console.log('signInHandler');
  const id = document.getElementById('id').value;
  const password = document.getElementById('password').value;
  console.log(id, password);
  console.log(payload);
  // console.log(Object.keys(payload));
  // console.log(getPayloadKeyNameByPacketType(packetType));
  // console.log(payload[getPayloadKeyNameByPacketType(packetType)]);
  // console.log(Object.keys(payload[getPayloadKeyNameByPacketType(packetType)]));

  // div 토글
  toggleCssClass('hide', 'login-buttons-01', 'main-buttons-01');

  // 토큰 저장
  window.localStorage.setItem('token', payload.token);
  sessionStorage.setItem('userId', payload.userId);
};

export default signInHandler;

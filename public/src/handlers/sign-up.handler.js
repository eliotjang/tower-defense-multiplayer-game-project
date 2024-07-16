import packetTypes from '../constants/packet-types.constants.js';
import { getPayloadKeyNameByPacketType, packetNames } from '../constants/proto.constants.js';
import Game from '../game.js';
import { toggleCssClass } from '../utils/toggler.utils.js';

const signUpHandler = ({ socket, packetType, payload }) => {
  console.log('signUpHandler');
  // div 토글
  toggleCssClass('hide', 'register-buttons-01', 'main-buttons-01');
  alert('회원가입 성공!');
};

export default signUpHandler;

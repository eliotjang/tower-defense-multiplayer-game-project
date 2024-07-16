import { toggleCssClass } from '../utils/toggler.utils.js';

const signUpHandler = ({ socket, packetType, payload }) => {
  // div 토글
  toggleCssClass('hide', 'register-buttons-01', 'main-buttons-01');
  alert('회원가입 성공!');
};

export default signUpHandler;

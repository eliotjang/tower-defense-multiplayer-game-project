import { toggleCssClass } from '../utils/toggler.utils.js';

const signUpHandler = ({ socket, packetType, payload }) => {
  // div 토글
  toggleCssClass('hide', 'register-buttons-01', 'main-buttons-01');
};

export default signUpHandler;

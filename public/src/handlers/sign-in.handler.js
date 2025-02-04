import { setToken } from '../auth/token.auth.js';
import { showMatchButton, toggleCssClass } from '../utils/toggler.utils.js';

const signInHandler = ({ socket, packetType, payload }) => {
  // div 토글
  toggleCssClass('hide', 'login-buttons-01', 'main-buttons-01');

  // 토큰 저장
  setToken(payload.token);
  sessionStorage.setItem('uuid', payload.uuid);

  showMatchButton();
};

export default signInHandler;

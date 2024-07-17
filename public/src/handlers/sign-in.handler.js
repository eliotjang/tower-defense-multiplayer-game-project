import { setToken } from '../auth/token.auth.js';
import { toggleCssClass } from '../utils/toggler.utils.js';

const signInHandler = ({ socket, packetType, payload }) => {
  // div 토글
  toggleCssClass('hide', 'login-buttons-01', 'main-buttons-01');

  // 토큰 저장
  setToken(payload.token);
  sessionStorage.setItem('uuid', payload.uuid);

  const matchButton = document.getElementById('matchButton');
  matchButton.classList.remove('hidden');

  const registerButton = document.getElementById('registerButton');
  const loginButton = document.getElementById('loginButton');
  registerButton.classList.add('hidden');
  loginButton.classList.add('hidden');
};

export default signInHandler;

import { displayModalMessage } from '../../modals/modal.js';
import { ErrorCodes } from './errorCodes.js';

export const handleError = (socket, error) => {
  let responseCode;
  let message;
  console.log(error);
  if (error.code === ErrorCodes.REQUEST_NOT_SUCCESS) {
    displayModalMessage(error.message);
  } else if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.error(`에러 코드: ${error.code}, 메시지: ${error.message}`);
  } else {
    responseCode = ErrorCodes.SOCKET_ERROR;
    message = error.message;
    console.error(`일반 에러: ${error.message}`);
  }
};

import { handleError } from '../utils/errors/errorHandler.js';

const onError = (socket) => async (error) => {
  await handleError(socket, error);
};

export default onError;

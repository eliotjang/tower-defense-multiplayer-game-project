import { ErrorCodes } from './errorCodes.js';

export const handleError = async (socket, error) => {
  try {
    console.error(error);
  } catch (err) {
    console.error(err);
  }
};

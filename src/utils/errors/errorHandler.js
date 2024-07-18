export const handleError = async (socket, error) => {
  try {
    console.error(error);
    // await removeUserSession(socket.uuid, true);
  } catch (err) {
    console.error(err);
  }
};

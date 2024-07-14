export const isNullish = (value) => {
  if (value === null || typeof value === 'undefined') {
    return true;
  }
  return false;
};

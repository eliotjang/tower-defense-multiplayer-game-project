export const userGoldSession = {};

export const createUserGold = (uuid) => {
  if (!userGoldSession[uuid]) {
    userGoldSession[uuid] = 5000;
  } // Set initial gold to 5000
//   console.log(userGoldSession[uuid]); // Log initial gold amount (optional)
};

// Function to retrieve user's current gold amount
export const getUserGold = (uuid) => {
  return userGoldSession[uuid];
};

// Function to update user's gold amount
export const updateUserGold = (uuid, amount) => {
  userGoldSession[uuid] = amount; // Update user's gold amount
};

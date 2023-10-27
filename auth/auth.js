const { getCredentials } = require('../utils/requestUtils');
const { getUser } = require('../utils/users');
/**
 * Get current user based on the request headers
 *
 * @param {http.IncomingMessage} request
 * @returns {Object|null} current authenticated user or null if not yet authenticated
 */
const getCurrentUser = async request => {
  // TODO: 8.5 Implement getting current user based on the "Authorization" request header

  // NOTE: You can import two methods which can be useful here: // - getCredentials(request) function from utils/requestUtils.js
  // - getUser(email, password) function from utils/users.js to get the currently logged in user
  const userData = getCredentials(request);
  if(!userData){
    return null;
  }
  const user = await getUser(userData[0], userData[1]);
  if(!user){
    return null;
  }
  return user;
};

module.exports = { getCurrentUser };
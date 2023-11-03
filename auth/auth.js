const User = require('../models/user');
const { getCredentials } = require('../utils/requestUtils');
// const { getUser } = require('../utils/users');
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
  // const user = await getUser(userData[0], userData[1]);
  const user = await User.findOne({email: userData[0]});
  if(!user){
    return null;
  }
  const passwordCorrect = await user.checkPassword(userData[1]);
  if(!passwordCorrect){
    return null;
  }
  return user;
};

module.exports = { getCurrentUser };
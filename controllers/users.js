const {
  removeUser,
  findUserById,
  findAllUsers,
  updateUserDetails,
  saveUser
} = require("../utils/dbUtils");
const responseUtils = require("../utils/responseUtils");

/**
 * Send all users as JSON
 *
 * @param {http.ServerResponse} response - the server response object
 * @returns {object} all users as JSON
 */
const getAllUsers = async (response) => {
  // TODO: 10.2 Implement this
  const users = await findAllUsers();
  return responseUtils.sendJson(response, users);
};

/**
 * Delete user and send deleted user as JSON
 *
 * @param {http.ServerResponse} response - server response object
 * @param {string} userId - ID of user to be deleted
 * @param {object} currentUser - (mongoose document object)
 * @returns {object} deleted user as JSON
 */
const deleteUser = async (response, userId, currentUser) => {
  // TODO: 10.2 Implement this
  const userById = await findUserById(userId);

  // User not found
  if (!userById) {
    return responseUtils.notFound(response);
  }
  // console.log(currentUser);
  // If current user's role is not admin
  if (currentUser.role !== "admin") {
    return responseUtils.forbidden(response);
  }

  if (currentUser._id.toString() === userId) {
    return responseUtils.badRequest(response, "Cannot delete yourself");
  }
  const deletedUser = await removeUser(userId);
  return responseUtils.sendJson(response, deletedUser);
};

/**
 * Update user and send updated user as JSON
 *
 * @param {http.ServerResponse} response - the server response object
 * @param {string} userId - ID of the user to be updated
 * @param {object} currentUser (mongoose document object)
 * @param {object} userData JSON data from request body
 * @returns {object} updated user as JSON
 */
const updateUser = async (response, userId, currentUser, userData) => {
  // TODO: 10.2 Implement this
  const userById = await findUserById(userId);

  // User not found
  if (!userById) {
    return responseUtils.notFound(response);
  }
  // console.log(currentUser);
  // If current user's role is not admin
  if (currentUser.role !== "admin") {
    return responseUtils.forbidden(response);
  }

  if (currentUser._id.toString() === userId) {
    return responseUtils.badRequest(
      response,
      "Updating own data is not allowed"
    );
  }
  const { role } = userData;
  if (!role) {
    return responseUtils.badRequest(response, "Invalid user data");
  }

  userById.role = role;
  const updatedUser = await updateUserDetails(userById);
  if (updatedUser) {
    return responseUtils.sendJson(response, updatedUser);
  } else {
    return responseUtils.badRequest(response, "Invalid user data");
  }
};

/**
 * Send user data as JSON
 *
 * @param {http.ServerResponse} response - the server response object
 * @param {string} userId - ID of user
 * @param {object} currentUser (mongoose document object)
 * @returns {object} data of user
 */
const viewUser = async (response, userId, currentUser) => {
  // TODO: 10.2 Implement this
  if (currentUser.role !== 'admin') {
    return responseUtils.forbidden(response);
  }
  const user = await findUserById(userId);
  if (!user) {
    return responseUtils.notFound(response);
  }
  return responseUtils.sendJson(response, user);
};

/**
 * Register new user and send created user back as JSON
 *
 * @param {http.ServerResponse} response - the server response object
 * @param {object} userData - JSON data from request body
 * @returns {object} newly created user as JSON
 */
const registerUser = async (response, userData) => {
  // TODO: 10.2 Implement this

  // try {
  //   const newUser = new User({ ...userData, role: "customer" });

  //   await newUser.validate(); // Explicitly validate the data against the schema

  //   const savedUser = await newUser.save();
  //   return responseUtils.createdResource(response, savedUser);
  // } catch (error) {
  //   // Handle validation or save errors
  //   return responseUtils.badRequest(response, "Invalid user data");
  // }
  
  const savedUser = await saveUser(userData);
  if(savedUser){
    return responseUtils.createdResource(response, savedUser);
  }
  else{
    return responseUtils.badRequest(response, "Invalid user data");
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  deleteUser,
  viewUser,
  updateUser,
};

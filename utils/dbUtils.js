const User = require("../models/user");

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return null;
  }
};

const removeUser = async (id) => {
  return await User.findByIdAndRemove(id);
};

const updateUserDetails = async (user) => {
  try {
    await user.validate();
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    return null;
  }
};

const findAllUsers = async () => {
  const users = await User.find({}).exec();
  return users;
};

const saveUser = async (user) => {
  const newUser = new User({ ...user, role: "customer" });
  try {
    await newUser.validate();
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return null;
  }
};

module.exports = {
  findUserById,
  removeUser,
  updateUserDetails,
  findAllUsers,
  saveUser,
};

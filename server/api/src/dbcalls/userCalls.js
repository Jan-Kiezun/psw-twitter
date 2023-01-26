const { User } = require("../models/users");

exports.getUser = async (user_id) => {
  return await User.findOne({ user_id: user_id });
};

exports.getUsers = async () => {
  return await User.find();
};

exports.createUser = async (user) => {
  return await User.create(user);
};

exports.updateUser = async (user_id, user) => {
  return await User.updateOne(user_id, user);
};

exports.deleteUser = async (user_id) => {
  return await User.deleteOne({ user_id: user_id });
};

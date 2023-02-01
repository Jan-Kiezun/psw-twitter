const { User } = require("../models/users");
const bcrypt = require("bcrypt");

exports.getUser = async (user_id) => {
  console.log("getUser", user_id);
  return await User.findOne({ user_id: user_id });
};

exports.getUsers = async (query = "") => {
  const result = await User.find({ user_id: { $regex: query, $options: "i" } });
  return result;
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

exports.loginUser = async (user) => {
  const userData = await User.findOne({ user_id: user.username });
  // const salt = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(userData?.pswd, salt);
  // console.log("hash", hash);
  const result = await bcrypt.compare(user.password, userData?.pswd);
  return result ? userData : null;
};

exports.verifyPassword = async (user) => {
  const data = await User.findOne({ user_id: user.user_id });
  return await bcrypt.compare(user.password, data.pswd);
};

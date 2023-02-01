const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pswd: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  urlToProfilePicture: {
    type: String,
    required: true,
  },
  urlToProfileBackground: {
    type: String,
    required: true,
  },
  joined: {
    type: Date,
    required: true,
  },
  following: {
    type: Number,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
UserSchema.plugin(validator);

const User = mongoose.model("users", UserSchema);
module.exports = { User };

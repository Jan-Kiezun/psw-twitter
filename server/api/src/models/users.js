const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("mongoose-unique-validator");
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
    required: false,
  },
  urlToProfilePicture: {
    type: String,
    required: false,
  },
  urlToProfileBackground: {
    type: String,
    required: false,
  },
  joined: {
    type: Date,
    required: true,
  },
  following: {
    type: Number,
    required: false,
  },
  followers: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
});
UserSchema.plugin(validator);
const User = mongoose.model("users", UserSchema);
module.exports = { User };

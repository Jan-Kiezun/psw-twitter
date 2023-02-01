const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("mongoose-unique-validator");
const TweetSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
  },
  retweets: {
    type: Number,
    required: false,
  },
  repliesTo: {
    type: Number,
    required: false,
  },
});
TweetSchema.plugin(validator);
const Tweet = mongoose.model("tweets", TweetSchema, "tweets");
module.exports = { Tweet };

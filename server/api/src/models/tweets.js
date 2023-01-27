const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("mongoose-unique-validator");
const TweetSchema = new Schema({
  tweet_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
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
  replies: {
    type: Number,
    required: false,
  },
});
TweetSchema.plugin(validator);
const Tweet = mongoose.model("tweets", TweetSchema);
module.exports = { Tweet };

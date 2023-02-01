const { Tweet } = require("../models/tweets");

exports.getTweet = async (id) => {
  return await Tweet.findOne({ id: id });
};

exports.getTweets = async (query = "") => {
  const result = await Tweet.find({
    content: { $regex: query, $options: "i" },
  });
  return result;
};

exports.createTweet = async (Tweet) => {
  return await Tweet.create(Tweet);
};

exports.updateTweet = async (id, Tweet) => {
  return await Tweet.updateOne(id, Tweet);
};

exports.deleteTweet = async (id) => {
  return await Tweet.deleteOne({ id: id });
};

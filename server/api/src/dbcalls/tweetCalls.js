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

exports.createTweet = async (tweetData) => {
  const tweetId = await Tweet.find().sort({ id: -1 }).limit(1);
  const tweet = new Tweet({
    ...tweetData,
    id: "" + (parseInt(tweetId[0].id) + 1),
  });
  return await tweet.save();
};

exports.updateTweet = async (id, Tweet) => {
  return await Tweet.updateOne(id, Tweet);
};

exports.deleteTweet = async (id) => {
  return await Tweet.deleteOne({ id: id });
};

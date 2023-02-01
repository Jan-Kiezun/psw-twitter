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

exports.updateTweet = async (id, tweet) => {
  return await Tweet.findOneAndUpdate({ id: id }, tweet, { new: true });
};

exports.deleteTweet = async (id) => {
  const deleted = await Tweet.find({ id: id });
  await Tweet.deleteOne({ id: id });
  const deletedReplies = await Tweet.find({ repliesTo: parseInt(id) });
  await Tweet.deleteMany({ repliesTo: parseInt(id) });
  console.log(deletedReplies, deleted);
  return [deleted[0].id, ...deletedReplies.map((reply) => reply.id)];
};

const express = require("express");
const router = express.Router();
const {
  getTweet,
  getTweets,
  createTweet,
  updateTweet,
  deleteTweet,
} = require("../dbcalls/tweetCalls");

router.get("/:id", async (req, res) => {
  const tweet = await getTweet(req.params.id);
  res.status(200).send(tweet);
});

router.get("/", async (req, res) => {
  const tweets = await getTweets();
  res.status(200).send(tweets);
});

router.get("/search/:query", async (req, res) => {
  const tweets = await getTweets(req.params.query);
  res.status(200).send(tweets);
});

router.post("/", async (req, res) => {
  const tweet = await createTweet(req.body);
  res.status(200).send(tweet);
});

router.put("/:id", async (req, res) => {
  const tweet = await updateTweet(req.params.id, req.body);
  res.status(200).send(tweet);
});

router.delete("/:id", async (req, res) => {
  const tweet = await deleteTweet(req.params.id);
  res.status(200).send(tweet);
});

module.exports = router;

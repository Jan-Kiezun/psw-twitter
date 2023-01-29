const express = require("express");
const router = express.Router();
const {
  getMessages,
  postMessage,
  updateMessage,
  deleteMessage,
} = require("../dbcalls/messageCalls");

router.get("/:user_id", async (req, res) => {
  const messages = await getMessages(req.params.user_id);
  res.status(200).send(messages[0][req.params.user_id]);
});

router.post("/:from/:to", async (req, res) => {
  const from = req.params.from;
  const to = req.params.to;
  console.log(from, to, Object.keys(req));
  const message = await postMessage(from, to, req.body);
  res.status(200).send(message);
});

module.exports = router;

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

module.exports = router;

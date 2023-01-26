const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../dbcalls/userCalls");

router.get("/:user_id", async (req, res) => {
  const user = await getUser(req.params.user_id);
  res.status(200).send(user);
});

router.get("/", async (req, res) => {
  const user = await getUsers();
  res.status(200).send(user);
});

router.post("/users/", async (req, res) => {
  const user = await createUser(req.body);
  res.status(200).send(user);
});

router.put("/:user_id", async (req, res) => {
  const user = await updateUser(req.params.user_id, req.body);
  res.status(200).send(user);
});

router.delete("/:user_id", async (req, res) => {
  const user = await deleteUser(req.params.user_id);
  res.status(200).send(user);
});

module.exports = router;

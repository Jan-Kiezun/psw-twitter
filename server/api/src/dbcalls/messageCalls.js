const { Messages } = require("../models/messages");

exports.getMessages = async (user_id) => {
  return await Messages.aggregate([
    {
      $project: {
        _id: 0,
        [user_id]: 1,
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postMessage = async (from, to, message) => {
  // Messages[from][to].push(message);
  // Messages[to][from].push(message);
  console.log("from: ", from);
  console.log("to: ", to);
  console.log("message: ", message);
  // await Messages.save();
  return { from, to, message };
};

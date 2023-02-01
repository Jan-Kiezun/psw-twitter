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
  const query1 = {};
  const query2 = {};
  query1[from] = {};
  query2[to] = {};
  query1[from][to] = message;
  query2[to][from] = message;
  await Messages.updateOne({}, { $push: query1 }, { upsert: true });
  await Messages.updateOne({}, { $push: query2 }, { upsert: true });
  console.log("from: ", from);
  console.log("to: ", to);
  console.log("message: ", message);
  console.log("query1: ", query1);
  console.log("query2: ", query2);
  return { from, to, message };
};

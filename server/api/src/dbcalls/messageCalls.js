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

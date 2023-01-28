const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("mongoose-unique-validator");

const UsersMessagesSchema = new Schema({
  chat_user_id: {
    type: Map,
    of: [
      {
        user_id: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

const AllMessagesSchema = new Schema({
  user_id: {
    type: Map,
    of: UsersMessagesSchema,
  },
});

AllMessagesSchema.plugin(validator);
const Messages = mongoose.model("messages", AllMessagesSchema);
module.exports = { Messages };

const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { User } = require("./src/models/users");
const { Tweet } = require("./src/models/tweets");
const { Messages } = require("./src/models/messages");
const fs = require("fs");
const cors = require("cors");

const whitelist = ["http://localhost:3000", "http://localhost:5001"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/twitterDB";

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //find all messages from mongoDB database with mongoose

    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}
var accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });
app.use(
  logger(":method :url :status :res[content-length] - :response-time ms", {
    stream: accessLogStream,
  })
);
app.use(logger("dev"));

app.use("/users", require("./src/routes/userRoutes"));
app.use("/tweets", require("./src/routes/tweetRoutes"));
app.use("/messages", require("./src/routes/messageRoutes"));

start();

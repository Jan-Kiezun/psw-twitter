const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { User } = require("./src/models/users");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/twitterDB";

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

app.use("/users", require("./src/routes/userRoutes"));

start();

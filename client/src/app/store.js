import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "../features/twitter/userSlice";
import tweetReducer from "../features/twitter/tweetSlice";
import messageReducer from "../features/twitter/messageSlice";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    tweetReducer: tweetReducer,
    messageReducer: messageReducer,
  },
  middleware: [thunk, logger],
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const tweetsURL = "http://localhost:5000/tweets";

const initialState = {
  tweets: [],
  status: "idle",
  error: null,
};

export const getTweets = createAsyncThunk("tweets/getTweets", async () => {
  const response = await axios.get(tweetsURL);
  return response.data;
});

export const addNewTweet = createAsyncThunk(
  "tweets/addNewTweet",
  async (initialTweet) => {
    const response = await axios.post(tweetsURL, { text: initialTweet.text });
    return response.data;
  }
);

export const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    tweetAdded: (state, action) => {
      state.tweets.push(action.payload);
    },
    tweetUpdated: (state, action) => {
      const { id, text } = action.payload;
      const existingTweet = state.tweets.find((tweet) => tweet.id === id);
      if (existingTweet) {
        existingTweet.text = text;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTweets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTweets.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched tweets to the array
        state.tweets = state.tweets.concat(action.payload);
      })
      .addCase(addNewTweet.fulfilled, (state, action) => {
        state.tweets.push(action.payload);
      });
  },
});

export const { tweetAdded, tweetUpdated } = tweetSlice.actions;

export default tweetSlice.reducer;

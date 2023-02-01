import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const tweetsURL = "http://localhost:5001/tweets";

const initialState = {
  tweets: [],
  searchedTweets: [],
  status: "idle",
  error: null,
};

export const getTweets = createAsyncThunk("tweets/getTweets", async () => {
  const response = await axios.get(tweetsURL);
  return response.data;
});

export const searchTweets = createAsyncThunk(
  "tweets/searchTweets",
  async (query) => {
    const response = await axios.get(`${tweetsURL}/search/${query}`);
    return response.data;
  }
);

export const postTweet = createAsyncThunk(
  "tweets/postTweet",
  async (initialTweet) => {
    const response = await axios.post(tweetsURL, initialTweet);
    console.log(response.data);
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
        state.tweets = action.payload;
      })
      .addCase(getTweets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(postTweet.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postTweet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tweets = state.tweets.concat(action.payload);
      })
      .addCase(postTweet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(searchTweets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchTweets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchedTweets = action.payload;
      })
      .addCase(searchTweets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { tweetAdded, tweetUpdated } = tweetSlice.actions;

export default tweetSlice.reducer;

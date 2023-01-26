import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const messagesURL = "http://localhost:5001/messages";

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const response = await axios.get(messagesURL);
    return response.data;
  }
);

export const addNewMessage = createAsyncThunk(
  "messages/addNewMessage",
  async (initialMessage) => {
    const response = await axios.post(messagesURL, {
      text: initialMessage.text,
    });
    return response.data;
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messageAdded: (state, action) => {
      state.messages.push(action.payload);
    },
    messageUpdated: (state, action) => {
      const { id, text } = action.payload;
      const existingMessage = state.messages.find(
        (message) => message.id === id
      );
      if (existingMessage) {
        existingMessage.text = text;
      }
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched messages to the array
      state.messages = state.messages.concat(action.payload);
    },
  },
});

export const { messageAdded, messageUpdated } = messageSlice.actions;

export default messageSlice.reducer;

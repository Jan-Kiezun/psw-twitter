﻿import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const messagesURL = "http://localhost:5001/messages";

const initialState = {
  messages: {},
  status: "idle",
  error: null,
};

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (user_id) => {
    const response = await axios.get(messagesURL + `/${user_id}`);
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
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched messages to the array
        state.allMessages = action.payload;
        state.users = Object.keys(action.payload);
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addNewMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { messageAdded, messageUpdated } = messageSlice.actions;

export default messageSlice.reducer;

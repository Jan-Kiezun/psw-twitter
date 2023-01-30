import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const messagesURL = "http://localhost:5001/messages";

const initialState = {
  messages: {},
  secretChats: [],
  secretChatsMessages: {},
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

export const postMessage = createAsyncThunk(
  "messages/postMessage",
  async ({ from, to, message }) => {
    const response = await axios.post(`${messagesURL}/${from}/${to}`, message);
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
    addSecretChat: (state, action) => {
      state.secretChats = _.uniq([...state.secretChats, action.payload]);
      console.log(state.secretChatsMessages);
      state.secretChatsMessages = {
        ...state.secretChatsMessages,
        [action.payload]: [],
      };
      console.log(state.secretChatsMessages);
      console.log(action.payload);
    },
    addSecretMessage: (state, action) => {
      const { from, to, message } = action.payload;
      console.log(current(state.secretChatsMessages), action.payload);
      const chat_id = to.slice(11, to.length);
      state.secretChatsMessages = {
        ...state.secretChatsMessages,
        [chat_id]: [...state.secretChatsMessages[chat_id], message],
      };
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

      .addCase(postMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched messages to the array
        const { from, to, message } = action.payload;
        state.allMessages = {
          ...state.allMessages,
          [to]: [...state.allMessages[to], message],
        };
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { messageAdded, messageUpdated, addSecretChat, addSecretMessage } =
  messageSlice.actions;

export default messageSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const userURL = "http://localhost:5001/users";

const initialState = {
  user: {
    user_id: "johndoe",
    username: "John Doe",
    email: "johndoe@example.com",
    pswd: "123",
    bio: "Just a regular guy trying to make the most out of life",
    urlToProfilePicture:
      "https://i.pravatar.cc/250?u=johndoe@ashallendesign.co.uk",
    urlToProfileBackground:
      "https://www.pexels.com/photo/bearded-man-in-black-jacket-taking-photo-12846570/",
    joined: "2022-01-01T12:00:00Z",
    following: 50,
    followers: 100,
    role: "user",
  },
  users: [],
  userProfile: {},
  status: "idle",
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk("user/getUser", async (user_id) => {
  const response = await axios.get(`${userURL}/${user_id}`);
  return response.data;
});

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await axios.get(userURL);
  return response.data;
});

export const addUser = createAsyncThunk("user/addUser", async (user) => {
  const response = await axios.post(userURL, user);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user_id, user) => {
    const response = await axios.put(`${userURL}/${user_id}`, user);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (user_id) => {
    const response = await axios.delete(`${userURL}/${user_id}`);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    selectUser: (state, action) => {
      console.log("selectUser", action.payload);
      state.userProfile =
        _.find(state.users, { user_id: action.payload }) || {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { login, selectUser } = userSlice.actions;

export default userSlice.reducer;

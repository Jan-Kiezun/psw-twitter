import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const userURL = "http://localhost:5001/users";

const initialState = {
  user: {},
  users: [],
  userProfile: {},
  searchedUsers: [],
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

export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (query) => {
    const response = await axios.get(`${userURL}/search/${query}`);
    return response.data;
  }
);

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

export const login = createAsyncThunk("user/login", async (user) => {
  const response = await axios.post(`${userURL}/login`, user);
  const userData = await axios.get(`${userURL}/${response.data.user_id}`);
  return userData.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action) => {
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

      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
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
      })

      .addCase(searchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedUsers = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectUser } = userSlice.actions;

export default userSlice.reducer;

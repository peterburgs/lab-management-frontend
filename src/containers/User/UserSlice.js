import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";
import _ from "lodash";

const initialState = {
  users: [],
  addUserStatus: "idle",
  addUserError: null,
  deleteUserStatus: "idle",
  deleteUserError: null,
  updateUserStatus: "idle",
  updateUserError: null,
  fetchUserStatus: "idle",
  fetchUserError: null,
  userIdToEdit: null,
  userIdToDelete: null,
  searchResult: [],
};

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const roles = [];
      if (user.adminRole) roles.push("ADMIN");
      if (user.lecturerRole) roles.push("LECTURER");
      const data = { ...user, isRemoved: false, roles };
      const response = await api.post("/users", data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, { rejectWithValue, getState }) => {
    try {
      const roles = [];
      if (user.adminRole) roles.push("ADMIN");
      if (user.lecturerRole) roles.push("LECTURER");
      const data = { ...user, isRemoved: false, roles };
      const res = await api.put(
        `/users/${getState().users.userIdToEdit}`,
        data
      );
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/users/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserRefreshed(state) {
      state.addUserError = null;
      state.addUserStatus = "idle";
    },
    updateUserRefreshed(state) {
      state.updateUserError = null;
      state.updateUserStatus = "idle";
    },
    deleteUserRefreshed(state) {
      state.deleteUserError = null;
      state.deleteUserStatus = "idle";
    },
    fetchUserRefreshed(state) {
      state.fetchUserStatus = "idle";
      state.fetchUserError = null;
    },
    setUserIdToEdit(state, action) {
      state.userIdToEdit = action.payload;
    },
    setUserIdToDelete(state, action) {
      state.userIdToDelete = action.payload;
    },
    search(state, action) {
      console.log(action.payload);
      state.searchResult = state.users.filter((c) =>
        c.fullName.toLowerCase().includes(String(action.payload).toLowerCase())
      );
    },
  },
  extraReducers: {
    // Add User reducers
    [addUser.fulfilled]: (state, action) => {
      state.users.push(action.payload.user);
      state.searchResult = _.cloneDeep(state.users);
      state.addUserStatus = "succeeded";
    },
    [addUser.pending]: (state, action) => {
      state.addUserStatus = "loading";
    },
    [addUser.rejected]: (state, action) => {
      state.addUserStatus = "failed";
      state.addUserError = action.payload;
    },
    // Delete User reducers
    [deleteUser.fulfilled]: (state, action) => {
      state.users = state.users.filter(
        (c) => c._id !== action.payload.user._id
      );
      state.searchResult = state.searchResult.filter(
        (c) => c._id !== action.payload.user._id
      );
      state.deleteUserStatus = "succeeded";
    },
    [deleteUser.pending]: (state, action) => {
      state.deleteUserStatus = "loading";
    },
    [deleteUser.rejected]: (state, action) => {
      state.deleteUserStatus = "failed";
      state.deleteUserError = action.payload;
    },
    // Update User reducers
    [updateUser.fulfilled]: (state, action) => {
      state.updateUserStatus = "succeeded";
      let index1 = state.users.findIndex(
        (c) => c._id === action.payload.user._id
      );
      let index2 = state.searchResult.findIndex(
        (c) => c._id === action.payload.user._id
      );
      if (index1 !== -1 && index2 !== -1) {
        state.users[index1] = _.cloneDeep(action.payload.user);
        state.searchResult[index2] = _.cloneDeep(action.payload.user);
      }
    },
    [updateUser.pending]: (state, action) => {
      state.updateUserStatus = "loading";
    },
    [updateUser.rejected]: (state, action) => {
      state.updateUserStatus = "failed";
      state.updateUserError = action.payload;
    },
    // fetch User reducers
    [fetchUser.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.searchResult = action.payload.users;
      state.fetchUserStatus = "succeeded";
    },
    [fetchUser.pending]: (state, action) => {
      state.fetchUserStatus = "loading";
    },
    [fetchUser.rejected]: (state, action) => {
      state.fetchUserStatus = "failed";
      state.fetchUserError = action.payload;
    },
  },
});

export const {
  addUserRefreshed,
  updateUserRefreshed,
  setUserIdToEdit,
  setUserIdToDelete,
  fetchUserRefreshed,
  deleteUserRefreshed,
  search,
} = usersSlice.actions;

export default usersSlice.reducer;

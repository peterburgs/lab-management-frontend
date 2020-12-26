import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";

const initialState = {
  token: null,
  user: null,
  getUserStatus: "idle",
  getUserError: null,
};

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ email, token, expirationDate }, { rejectWithValue, dispatch }) => {
    console.log(email);
    try {
      const res = await api.get("/auth", {
        params: {
          email,
        },
      });
      dispatch(authSuccess({ token }));
      setTimeout(() => {
        dispatch(logout());
      }, expirationDate.getTime() - new Date().getTime());
      return res.data;
    } catch (err) {
      dispatch(logout());
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess(state, action) {
      state.token = action.payload.token;
    },
    getUserRefresh(state, action) {
      state.getUserStatus = "idle";
      state.getUserError = null;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("name");
      localStorage.removeItem("imageUrl");
      localStorage.removeItem("email");
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.getUserStatus = "succeeded";
    },
    [getUser.pending]: (state, action) => {
      state.getUserStatus = "loading";
    },
    [getUser.rejected]: (state, action) => {
      state.getUserStatus = "failed";
      state.getUserError = "Invalid email";
    },
  },
});

export const {
  logout,
  authFailure,
  authSuccess,
  getUserRefresh,
} = authSlice.actions;

export default authSlice.reducer;

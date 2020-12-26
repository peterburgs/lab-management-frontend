import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/index";

const initialState = {
  token: null,
  user: null,
  getUserStatus: "idle",
  getUserError: null,
  userRole: "LECTURER",
};

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (
    { email, token, expirationDate, userRole },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const res = await api.get("/auth", {
        params: {
          role: getState().auth.userRole,
          email,
        },
      });
      dispatch(authSuccess({ token }));
      dispatch(setUserRole(userRole));
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
    setUserRole(state, action) {
      state.userRole = action.payload;
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
      state.getUserError = action.payload;
    },
  },
});

export const {
  logout,
  authFailure,
  authSuccess,
  getUserRefresh,
  setUserRole,
} = authSlice.actions;

export default authSlice.reducer;

/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userRole: 'admin',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess(state, action) {
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("name");
      localStorage.removeItem("imageUrl");
    },
  },
});

export const { logout, authFailure, authSuccess } = authSlice.actions;

export default authSlice.reducer;

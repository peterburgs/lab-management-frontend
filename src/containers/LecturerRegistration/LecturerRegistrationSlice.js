import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";

const initialState = {
  semester: null,
  teachings: [
    {
      id: 1,
      lecturerId: 123,
      lecturerName: "Le Vinh Thinh A",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 2,
      lecturerId: 124,
      lecturerName: "Le Vinh Thinh B",
      courseName: "New technology",
      group: 1,
    },
  ],
  fetchSemesterStatus: "idle",
  fetchSemesterError: null,
};

export const fetchSemester = createAsyncThunk(
  "lecturerRegistration/fetchSemester",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/semesters");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const lecturerRegistrationSlice = createSlice({
  name: "lecturerRegistration",
  initialState,
  reducers: {
    fetchSemesterRefreshed(state) {
      state.fetchSemesterError = null;
      state.fetchSemesterStatus = "idle";
    },
  },
  extraReducers: {
    [fetchSemester.pending]: (state) => {
      state.fetchSemesterStatus = "loading";
    },
    [fetchSemester.fulfilled]: (state, action) => {
      state.fetchSemesterStatus = "succeeded";
      state.semester = action.payload.semester;
    },
    [fetchSemester.rejected]: (state, action) => {
      state.fetchSemesterError = action.payload;
      state.fetchSemesterStatus = "failed";
    },
  },
});

export const {
  fetchSemesterRefreshed,
} = lecturerRegistrationSlice.actions;

export default lecturerRegistrationSlice.reducer;

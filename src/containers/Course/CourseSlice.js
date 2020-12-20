import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";

const initialState = {
  courses: [
    {
      id: 123,
      name: "Intro to programming",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 124,
      name: "Intro to IT",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 125,
      name: "Database System",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 126,
      name: "Database Management System",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 127,
      name: "Programming Technique",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 128,
      name: "Networking Essentials",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
  ],
  addCourseStatus: "idle",
  addCourseError: null,
};

export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course, { rejectWithValue }) => {
    try {
      const response = await api.post("/courses", course);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourseRefreshed(state) {
      state.addCourseError = null;
      state.addCourseStatus = "idle";
    },
  },
  extraReducers: {
    [addCourse.fulfilled]: (state, action) => {
      state.courses.push(action.payload);
      state.addCourseStatus = "succeeded";
    },
    [addCourse.pending]: (state, action) => {
      state.addCourseStatus = "loading";
    },
    [addCourse.failed]: (state, action) => {
      state.addCourseStatus = "failed";
      state.addCourseError = action.payload;
    },
  },
});

export const { addCourseRefreshed } = coursesSlice.actions;

export default coursesSlice.reducer;

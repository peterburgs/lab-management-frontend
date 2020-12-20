import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";

const initialState = {
  courses: [],
  addCourseStatus: "idle",
  addCourseError: null,
  updateCourseStatus: "idle",
  updateCourseError: null,
  fetchCourseStatus: "idle",
  fetchCourseError: null,
  course: null,
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

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course, { rejectWithValue }) => {
    console.log(course);
    try {
      const res = await api.put(
        `/courses/${course.courseId}`,
        course
      );
      return res.data;
    } catch (err) {
      console.log(err.message);
      rejectWithValue(err.message);
    }
  }
);

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/courses");
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/courses/${courseId}`);
      console.log(res);

      return res.data;
    } catch (err) {
      console.log(err.message);
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
    [updateCourse.fulfilled]: (state, action) => {
      state.updateCourseStatus = "succeeded";
      console.log(action.payload);
      let oldCourse = state.courses.find(
        (c) => c._id === action.payload.course._id
      );
      oldCourse = action.payload.course;
    },
    [updateCourse.pending]: (state, action) => {
      state.updateCourseStatus = "loading";
    },
    [updateCourse.failed]: (state, action) => {
      state.updateCourseStatus = "failed";
      state.updateCourseError = action.payload;
    },
    [getCourseById.fulfilled]: (state, action) => {
      state.course = action.payload.course;
    },
    //
    [fetchCourse.fulfilled]: (state, action) => {
      state.courses = action.payload.courses;
      state.fetchCourseStatus = "succeeded";
    },
    [fetchCourse.pending]: (state, action) => {
      state.fetchCourseStatus = "loading";
    },
    [fetchCourse.failed]: (state, action) => {
      state.fetchCourseStatus = "failed";
      state.fetchCourseError = action.payload;
    },
  },
});

export const { addCourseRefreshed } = coursesSlice.actions;

export default coursesSlice.reducer;

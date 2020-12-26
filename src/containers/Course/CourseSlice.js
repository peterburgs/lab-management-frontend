import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";
import _ from "lodash";

const initialState = {
  courses: [],
  addCourseStatus: "idle",
  addCourseError: null,
  deleteCourseStatus: "idle",
  deleteCourseError: null,
  updateCourseStatus: "idle",
  updateCourseError: null,
  fetchCourseStatus: "idle",
  fetchCourseError: null,
  courseIdToEdit: null,
  courseIdToDelete: null,
  searchResult: [],
};

export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course, { rejectWithValue }) => {
    try {
      const data = { ...course, isRemoved: false };
      const response = await api.post("/courses", data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course, { rejectWithValue, getState }) => {
    console.log(course);
    try {
      const res = await api.put(
        `/courses/${getState().courses.courseIdToEdit}`,
        course
      );
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/courses/${courseId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
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
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/courses/${courseId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
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
    updateCourseRefreshed(state) {
      state.updateCourseError = null;
      state.updateCourseStatus = "idle";
    },
    deleteCourseRefreshed(state) {
      state.deleteCourseError = null;
      state.deleteCourseStatus = "idle";
    },
    fetchCourseRefreshed(state) {
      state.fetchCourseStatus = "idle";
      state.fetchCourseError = null;
    },
    setCourseIdToEdit(state, action) {
      state.courseIdToEdit = action.payload;
    },
    setCourseIdToDelete(state, action) {
      state.courseIdToDelete = action.payload;
    },
    search(state, action) {
      console.log(action.payload);
      state.searchResult = state.courses.filter((c) =>
        c.courseName
          .toLowerCase()
          .includes(String(action.payload).toLowerCase())
      );
    },
  },
  extraReducers: {
    // Add course reducers
    [addCourse.fulfilled]: (state, action) => {
      state.courses.push(action.payload.course);
      state.searchResult = _.cloneDeep(state.courses);
      state.addCourseStatus = "succeeded";
    },
    [addCourse.pending]: (state, action) => {
      state.addCourseStatus = "loading";
    },
    [addCourse.rejected]: (state, action) => {
      state.addCourseStatus = "failed";
      state.addCourseError = action.payload;
    },
    // Delete course reducers
    [deleteCourse.fulfilled]: (state, action) => {
      state.courses = state.courses.filter(
        (c) => c._id !== action.payload.course._id
      );
      state.searchResult = state.searchResult.filter(
        (c) => c._id !== action.payload.course._id
      );
      state.deleteCourseStatus = "succeeded";
    },
    [deleteCourse.pending]: (state, action) => {
      state.deleteCourseStatus = "loading";
    },
    [deleteCourse.rejected]: (state, action) => {
      state.deleteCourseStatus = "failed";
      state.deleteCourseError = action.payload;
    },
    // Update course reducers
    [updateCourse.fulfilled]: (state, action) => {
      state.updateCourseStatus = "succeeded";
      console.log(action.payload);
      let index1 = state.courses.findIndex(
        (c) => c._id === action.payload.course._id
      );
      let index2 = state.searchResult.findIndex(
        (c) => c._id === action.payload.course._id
      );
      if (index1 !== -1 && index2 !== -1) {
        state.courses[index1] = _.cloneDeep(action.payload.course);
        state.searchResult[index2] = _.cloneDeep(action.payload.course);
      }
    },
    [updateCourse.pending]: (state, action) => {
      state.updateCourseStatus = "loading";
    },
    [updateCourse.rejected]: (state, action) => {
      state.updateCourseStatus = "failed";
      state.updateCourseError = action.payload;
    },
    // fetch course reducers
    [fetchCourse.fulfilled]: (state, action) => {
      state.courses = action.payload.courses;
      state.searchResult = action.payload.courses;
      state.fetchCourseStatus = "succeeded";
    },
    [fetchCourse.pending]: (state, action) => {
      state.fetchCourseStatus = "loading";
    },
    [fetchCourse.rejected]: (state, action) => {
      state.fetchCourseStatus = "failed";
      state.fetchCourseError = action.payload;
    },
  },
});

export const {
  addCourseRefreshed,
  updateCourseRefreshed,
  setCourseIdToEdit,
  setCourseIdToDelete,
  fetchCourseRefreshed,
  deleteCourseRefreshed,
  search,
} = coursesSlice.actions;

export default coursesSlice.reducer;

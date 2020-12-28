import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";
import _ from "lodash";

const initialState = {
  teachings: [],
  semester: null,
  addTeachingStatus: "idle",
  addTeachingError: null,
  deleteTeachingStatus: "idle",
  deleteTeachingError: null,
  updateTeachingStatus: "idle",
  updateTeachingError: null,
  fetchTeachingStatus: "idle",
  fetchTeachingError: null,
  teachingIdToEdit: null,
  teachingIdToDelete: null,
  fetchSemesterStatus: "idle",
  fetchSemesterError: null,
  openingRegistration: null,
  fetchOpeningRegistrationStatus: "idle",
  fetchOpeningRegistrationError: null,
};

export const fetchSemester = createAsyncThunk(
  "lecturerRegistration/fetchSemester",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/semesters");
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchOpeningRegistration = createAsyncThunk(
  "lecturerRegistration/fetchOpeningRegistration",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/registrations/opening");
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const addTeaching = createAsyncThunk(
  "lecturerRegistration/addTeaching",
  async (teaching, { rejectWithValue, getState }) => {
    try {
      const data = {
        ...teaching,
        isRemoved: false,
        user: getState().auth.user._id,
        registration: getState().lecturerRegistration.semester.registrations.find(
          (e) => e.isOpening === true
        )._id,
        role: getState().auth.userRole,
      };
      console.log(data);
      const response = await api.post("/teachings", data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const updateTeaching = createAsyncThunk(
  "lecturerRegistration/updateTeaching",
  async (teaching, { rejectWithValue, getState }) => {
    try {
      const res = await api.put(
        `/teachings/${
          getState().lecturerRegistration.teachingIdToEdit
        }`,
        teaching
      );
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteTeaching = createAsyncThunk(
  "lecturerRegistration/deleteTeaching",
  async (teachingId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/teachings/${teachingId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTeaching = createAsyncThunk(
  "lecturerRegistration/fetchTeaching",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/teachings/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getTeachingById = createAsyncThunk(
  "lecturerRegistration/getTeachingById",
  async (teachingId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/teachings/find/${teachingId}`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const LecturerRegistrationSlice = createSlice({
  name: "lecturerRegistration",
  initialState,
  reducers: {
    addTeachingRefreshed(state) {
      state.addTeachingError = null;
      state.addTeachingStatus = "idle";
    },
    updateTeachingRefreshed(state) {
      state.updateTeachingError = null;
      state.updateTeachingStatus = "idle";
    },
    deleteTeachingRefreshed(state) {
      state.deleteTeachingError = null;
      state.deleteTeachingStatus = "idle";
    },
    fetchTeachingRefreshed(state) {
      state.fetchTeachingStatus = "idle";
      state.fetchTeachingError = null;
    },
    fetchSemesterRefreshed(state) {
      state.fetchSemesterStatus = "idle";
      state.fetchSemesterError = null;
    },
    fetchOpeningRegistrationRefreshed(state) {
      state.fetchOpeningRegistrationStatus = "idle";
      state.fetchOpeningRegistrationError = null;
    },
    setTeachingIdToEdit(state, action) {
      state.teachingIdToEdit = action.payload;
    },
    setTeachingIdToDelete(state, action) {
      state.teachingIdToDelete = action.payload;
    },
  },
  extraReducers: {
    // Add teachings reducers
    [addTeaching.fulfilled]: (state, action) => {
      state.teachings.push(action.payload.teaching);
      state.addTeachingStatus = "succeeded";
    },
    [addTeaching.pending]: (state, action) => {
      state.addTeachingStatus = "loading";
    },
    [addTeaching.rejected]: (state, action) => {
      state.addTeachingStatus = "failed";
      state.addTeachingError = action.payload;
    },
    // fetch semester reducers
    [fetchSemester.fulfilled]: (state, action) => {
      state.semester = action.payload.semester;
      state.fetchSemesterStatus = "succeeded";
    },
    [fetchSemester.pending]: (state, action) => {
      state.fetchSemesterStatus = "loading";
    },
    [fetchSemester.rejected]: (state, action) => {
      state.fetchSemesterStatus = "failed";
      state.fetchSemesterError = action.payload;
    },
    // fetch opening registration reducers
    [fetchOpeningRegistration.fulfilled]: (state, action) => {
      state.openingRegistration = action.payload.openingRegistration;
      state.fetchOpeningRegistrationStatus = "succeeded";
    },
    [fetchOpeningRegistration.pending]: (state, action) => {
      state.fetchOpeningRegistrationStatus = "loading";
    },
    [fetchOpeningRegistration.rejected]: (state, action) => {
      state.fetchOpeningRegistrationStatus = "failed";
      state.fetchOpeningRegistrationError = action.payload;
    },
    // Delete teaching reducers
    [deleteTeaching.fulfilled]: (state, action) => {
      state.teachings = state.teachings.filter(
        (c) => c._id !== action.payload.teaching._id
      );
      state.deleteTeachingStatus = "succeeded";
    },
    [deleteTeaching.pending]: (state, action) => {
      state.deleteTeachingStatus = "loading";
    },
    [deleteTeaching.rejected]: (state, action) => {
      state.deleteTeachingStatus = "failed";
      state.deleteTeachingError = action.payload;
    },
    // Update Teaching reducers
    [updateTeaching.fulfilled]: (state, action) => {
      state.updateTeachingStatus = "succeeded";
      let index = state.teachings.findIndex(
        (c) => c._id === action.payload.teaching._id
      );
      if (index !== -1) {
        state.teachings[index] = _.cloneDeep(action.payload.teaching);
      }
    },
    [updateTeaching.pending]: (state, action) => {
      state.updateTeachingStatus = "loading";
    },
    [updateTeaching.rejected]: (state, action) => {
      state.updateTeachingStatus = "failed";
      state.updateTeachingError = action.payload;
    },
    // fetch Teaching reducers
    [fetchTeaching.fulfilled]: (state, action) => {
      state.teachings = action.payload.teachings;
      state.fetchTeachingStatus = "succeeded";
    },
    [fetchTeaching.pending]: (state, action) => {
      state.fetchTeachingStatus = "loading";
    },
    [fetchTeaching.rejected]: (state, action) => {
      state.fetchTeachingStatus = "failed";
      state.fetchTeachingError = action.payload;
    },
  },
});

export const {
  addTeachingRefreshed,
  updateTeachingRefreshed,
  setTeachingIdToEdit,
  setTeachingIdToDelete,
  fetchTeachingRefreshed,
  deleteTeachingRefreshed,
  fetchSemesterRefreshed,
  fetchOpeningRegistrationRefreshed,
} = LecturerRegistrationSlice.actions;

export default LecturerRegistrationSlice.reducer;

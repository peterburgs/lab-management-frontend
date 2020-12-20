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
  startSemesterStatus: "idle",
  startSemesterError: null,
  fetchSemesterStatus: "idle",
  fetchSemesterError: null,
  updateSemesterStatus: "idle",
  updateSemesterError: null,
  openRegistrationStatus: "idle",
  openRegistrationError: null,
};

export const startSemester = createAsyncThunk(
  "registration/startSemester",
  async (semester, { rejectWithValue }) => {
    try {
      const response = await api.post("/semesters", semester);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const updateSemester = createAsyncThunk(
  "registration/updateSemester",
  async (semester, { getState, rejectWithValue }) => {
    try {
      const res = await api.put(
        `/semesters/${getState().registration.semester._id}`,
        semester
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSemester = createAsyncThunk(
  "registration/fetchSemester",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/semesters");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const openRegistration = createAsyncThunk(
  "registration/openRegistration",
  async (registration, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/registrations", registration);
      dispatch(fetchSemester());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    startSemesterRefreshed(state) {
      state.startSemesterError = null;
      state.startSemesterStatus = "idle";
    },
    updateSemesterRefreshed(state) {
      state.updateSemesterError = null;
      state.updateSemesterStatus = "idle";
    },
    openRegistrationRefreshed(state) {
      state.openRegistrationError = null;
      state.openRegistrationStatus = "idle";
    },
    fetchSemesterRefreshed(state) {
      state.fetchSemesterError = null;
      state.fetchSemesterStatus = "idle";
    },
  },
  extraReducers: {
    [openRegistration.pending]: (state) => {
      state.openRegistrationStatus = "loading";
    },
    [openRegistration.fulfilled]: (state, action) => {
      state.openRegistrationStatus = "succeeded";
    },
    [openRegistration.rejected]: (state, action) => {
      state.openSemesterError = action.payload;
      state.openRegistrationStatus = "failed";
    },
    [updateSemester.pending]: (state) => {
      state.updateSemesterStatus = "loading";
    },
    [updateSemester.fulfilled]: (state, action) => {
      state.updateSemesterStatus = "succeeded";
      state.semester = action.payload.semester;
    },
    [updateSemester.rejected]: (state, action) => {
      state.updateSemesterError = action.payload;
      state.updateSemesterStatus = "failed";
    },
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
    [startSemester.pending]: (state) => {
      state.startSemesterStatus = "loading";
    },
    [startSemester.fulfilled]: (state, action) => {
      state.startSemesterStatus = "succeeded";
      state.semester = action.payload.semester;
    },
    [startSemester.rejected]: (state, action) => {
      state.startSemesterError = action.payload;
      state.startSemesterStatus = "failed";
    },
  },
});

export const {
  startSemesterRefreshed,
  fetchSemesterRefreshed,
  updateSemesterRefreshed,
  openRegistrationRefreshed,
} = registrationSlice.actions;

export default registrationSlice.reducer;

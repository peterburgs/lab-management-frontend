import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";
import produce from "immer";

const initialState = {
  semester: null,
  startSemesterStatus: "idle",
  startSemesterError: null,
  fetchSemesterStatus: "idle",
  fetchSemesterError: null,
  updateSemesterStatus: "idle",
  updateSemesterError: null,
  openRegistrationStatus: "idle",
  openRegistrationError: null,
  closeRegistrationStatus: "idle",
  closeRegistrationError: null,
  generateScheduleStatus: "idle",
  generateScheduleError: null,
  registrationToGenerate: null,
};

export const startSemester = createAsyncThunk(
  "registration/startSemester",
  async (semester, { rejectWithValue }) => {
    try {
      const stabilizedSemester = produce(semester, (draft) => {
        draft.startDate = new Date(draft.startDate).toISOString();
        draft.isOpening = true;
      });
      const response = await api.post(
        "/semesters",
        stabilizedSemester
      );
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
      const stabilizedSemester = produce(semester, (draft) => {
        draft.startDate = new Date(draft.startDate).toISOString();
      });
      const res = await api.put(
        `/semesters/${getState().registration.semester._id}`,
        stabilizedSemester
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
  async (registration, { dispatch, rejectWithValue, getState }) => {
    try {
      const stabilizedRegistration = produce(
        registration,
        (draft) => {
          draft.startDate = new Date(draft.startDate).toISOString();
          draft.endDate = new Date(draft.endDate).toISOString();
          draft.isOpening = true;
          draft.semester = getState().registration.semester._id;
          draft.patch =
            getState().registration.semester.registrations.length + 1;
        }
      );
      const res = await api.post(
        "/registrations",
        stabilizedRegistration
      );
      dispatch(fetchSemester());
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const closeRegistration = createAsyncThunk(
  "registration/closeRegistration",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const openingRegistration = getState().registration.semester.registrations.find(
        (reg) => reg.isOpening === true
      );
      const stabilizedRegistration = produce(
        openingRegistration,
        (draft) => {
          draft.isOpening = false;
        }
      );
      const res = await api.put(
        `/registrations/${openingRegistration._id}`,
        stabilizedRegistration
      );
      dispatch(fetchSemester());
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const generateSchedule = createAsyncThunk(
  "registration/generateSchedule",
  async (isNew, { rejectWithValue, getState }) => {
    try {
      const res = await api.post("/schedules/generate", {
        isNew: isNew,
        registrationId: getState().registration
          .registrationToGenerate,
      });
      return res.data;
    } catch (err) {
      console.log(err.message);
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
    closeRegistrationRefreshed(state) {
      state.closeRegistrationError = null;
      state.closeRegistrationStatus = "idle";
    },
    fetchSemesterRefreshed(state) {
      state.fetchSemesterError = null;
      state.fetchSemesterStatus = "idle";
    },
    generateScheduleRefreshed(state) {
      state.generateScheduleError = null;
      state.generateScheduleStatus = "idle";
    },
    setRegistrationToGenerate(state, action) {
      state.registrationToGenerate = action.payload;
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
      state.openRegistrationError = action.payload;
      state.openRegistrationStatus = "failed";
    },
    [generateSchedule.pending]: (state) => {
      state.generateScheduleStatus = "loading";
    },
    [generateSchedule.fulfilled]: (state, action) => {
      state.generateScheduleStatus = "succeeded";
    },
    [generateSchedule.rejected]: (state, action) => {
      state.generateScheduleError = action.payload;
      state.generateScheduleStatus = "failed";
    },
    [closeRegistration.pending]: (state) => {
      state.closeRegistrationStatus = "loading";
    },
    [closeRegistration.fulfilled]: (state, action) => {
      state.closeRegistrationStatus = "succeeded";
    },
    [closeRegistration.rejected]: (state, action) => {
      state.closeRegistrationError = action.payload;
      state.closeRegistrationStatus = "failed";
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
  closeRegistrationRefreshed,
  generateScheduleRefreshed,
  setRegistrationToGenerate,
} = registrationSlice.actions;

export default registrationSlice.reducer;

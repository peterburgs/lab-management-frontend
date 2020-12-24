import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/index";
import _ from "lodash";

const initialState = {
  labs: [],
  addLabStatus: "idle",
  addLabError: null,
  deleteLabStatus: "idle",
  deleteLabError: null,
  updateLabStatus: "idle",
  updateLabError: null,
  fetchLabStatus: "idle",
  fetchLabError: null,
  labIdToEdit: null,
  labIdToDelete: null,
  searchResult: [],
};

export const addLab = createAsyncThunk(
  "labs/addLab",
  async (lab, { rejectWithValue }) => {
    try {
      const data = { ...lab, isRemoved: false };
      const response = await api.post("/labs", data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const updateLab = createAsyncThunk(
  "labs/updateLab",
  async (lab, { rejectWithValue, getState }) => {
    try {
      const res = await api.put(`/labs/${getState().labs.labIdToEdit}`, lab);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const deleteLab = createAsyncThunk(
  "labs/deleteLab",
  async (labId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/labs/${labId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchLab = createAsyncThunk(
  "labs/fetchLab",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/labs");
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const getLabById = createAsyncThunk(
  "labs/getLabById",
  async (labId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/labs/${labId}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const labsSlice = createSlice({
  name: "labs",
  initialState,
  reducers: {
    addLabRefreshed(state) {
      state.addLabError = null;
      state.addLabStatus = "idle";
    },
    updateLabRefreshed(state) {
      state.updateLabError = null;
      state.updateLabStatus = "idle";
    },
    deleteLabRefreshed(state) {
      state.deleteLabError = null;
      state.deleteLabStatus = "idle";
    },
    fetchLabRefreshed(state) {
      state.fetchLabStatus = "idle";
      state.fetchLabError = null;
    },
    setLabIdToEdit(state, action) {
      state.labIdToEdit = action.payload;
    },
    setLabIdToDelete(state, action) {
      state.labIdToDelete = action.payload;
    },
    search(state, action) {
      state.searchResult = state.labs.filter((c) =>
        c.labName.toLowerCase().includes(String(action.payload).toLowerCase())
      );
    },
  },
  extraReducers: {
    // Add Lab reducers
    [addLab.fulfilled]: (state, action) => {
      state.labs.push(action.payload.lab);
      state.searchResult = _.cloneDeep(state.labs);
      state.addLabStatus = "succeeded";
    },
    [addLab.pending]: (state, action) => {
      state.addLabStatus = "loading";
    },
    [addLab.rejected]: (state, action) => {
      state.addLabStatus = "failed";
      state.addLabError = action.payload;
    },
    // Delete Lab reducers
    [deleteLab.fulfilled]: (state, action) => {
      state.labs = state.labs.filter((c) => c._id !== action.payload.lab._id);
      state.searchResult = state.searchResult.filter(
        (c) => c._id !== action.payload.lab._id
      );
      state.deleteLabStatus = "succeeded";
    },
    [deleteLab.pending]: (state, action) => {
      state.deleteLabStatus = "loading";
    },
    [deleteLab.rejected]: (state, action) => {
      state.deleteLabStatus = "failed";
      state.deleteLabError = action.payload;
    },
    // Update Lab reducers
    [updateLab.fulfilled]: (state, action) => {
      state.updateLabStatus = "succeeded";
      console.log(action.payload);
      let index1 = state.labs.findIndex(
        (c) => c._id === action.payload.lab._id
      );
      let index2 = state.searchResult.findIndex(
        (c) => c._id === action.payload.lab._id
      );
      if (index1 !== -1 && index2 !== -1) {
        state.labs[index1] = _.cloneDeep(action.payload.lab);
        state.searchResult[index2] = _.cloneDeep(action.payload.lab);
      }
    },
    [updateLab.pending]: (state, action) => {
      state.updateLabStatus = "loading";
    },
    [updateLab.rejected]: (state, action) => {
      state.updateLabStatus = "failed";
      state.updateLabError = action.payload;
    },
    [getLabById.fulfilled]: (state, action) => {
      state.lab = action.payload.lab;
    },
    // fetch Lab reducers
    [fetchLab.fulfilled]: (state, action) => {
      state.labs = action.payload.labs;
      state.searchResult = action.payload.labs;
      state.fetchLabStatus = "succeeded";
    },
    [fetchLab.pending]: (state, action) => {
      state.fetchLabStatus = "loading";
    },
    [fetchLab.rejected]: (state, action) => {
      state.fetchLabStatus = "failed";
      state.fetchLabError = action.payload;
    },
  },
});

export const {
  addLabRefreshed,
  updateLabRefreshed,
  setLabIdToEdit,
  setLabIdToDelete,
  fetchLabRefreshed,
  deleteLabRefreshed,
  search,
} = labsSlice.actions;

export default labsSlice.reducer;

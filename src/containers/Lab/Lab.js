import React, { useState, useEffect, useCallback } from "react";
import useStyles from "./Lab.styles";
import {
  Grid,
  Paper,
  IconButton,
  InputBase,
  Snackbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LabTable from "./LabTable/LabTable";
import LabDialog from "./LabDialog/LabDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLab,
  setLabIdToEdit,
  setLabIdToDelete,
  search,
  fetchLabRefreshed,
  deleteLab,
  deleteLabRefreshed,
} from "./LabSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
import RefreshIcon from "@material-ui/icons/Refresh";

const useFetchLab = () => {
  const dispatch = useDispatch();

  const fetchLabStatus = useSelector((state) => state.labs.fetchLabStatus);
  const fetchLabError = useSelector((state) => state.labs.fetchLabError);

  useEffect(() => {
    if (fetchLabStatus === "idle") {
      (async () => {
        try {
          const fetchLabResult = await dispatch(fetchLab());
          unwrapResult(fetchLabResult);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (fetchLabStatus === "failed" || fetchLabStatus === "succeeded") {
        dispatch(fetchLabRefreshed());
      }
    };
  }, [dispatch, fetchLabStatus]);

  return [fetchLabStatus, fetchLabError];
};

const useDeleteLab = () => {
  const dispatch = useDispatch();

  const deleteLabStatus = useSelector((state) => state.labs.deleteLabStatus);
  const deleteLabError = useSelector((state) => state.labs.deleteLabError);

  const handleDeleteLab = useCallback(
    async (labId) => {
      try {
        const deleteLabRes = await dispatch(deleteLab(labId));
        unwrapResult(deleteLabRes);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return [deleteLabStatus, deleteLabError, handleDeleteLab];
};

const Lab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openedLabDialog, setOpenedLabDialog] = useState(false);

  // Application state
  const searchResult = useSelector((state) => state.labs.searchResult);
  const labIdToDelete = useSelector((state) => state.labs.labIdToDelete);
  const labIdToEdit = useSelector((state) => state.labs.labIdToEdit);

  // Fetch Lab state
  const [fetchLabStatus, fetchLabError] = useFetchLab();

  // Delete Lab state
  const [deleteLabStatus, deleteLabError, handleDeleteLab] = useDeleteLab();

  const handleSearch = (e) => {
    dispatch(search(e.target.value));
  };

  const handleDelete = async () => {
    await handleDeleteLab(labIdToDelete);
    dispatch(setLabIdToDelete(null));
  };

  return (
    <div className={classes.Lab}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={fetchLabStatus === "failed" ? true : false}
        autoHideDuration={6000}
        message={fetchLabError}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => dispatch(fetchLabRefreshed())}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <LabDialog
        isOpen={labIdToEdit ? true : openedLabDialog}
        onCancel={() => {
          labIdToEdit
            ? dispatch(setLabIdToEdit(null))
            : setOpenedLabDialog(false);
        }}
        onFinish={() => {
          labIdToEdit
            ? dispatch(setLabIdToEdit(null))
            : setOpenedLabDialog(false);
        }}
      />
      <ConfirmDialog
        isOpen={Boolean(labIdToDelete)}
        onCancel={() => dispatch(setLabIdToDelete(null))}
        onSubmit={handleDelete}
        onLoading={deleteLabStatus === "loading"}
        onClose={() => dispatch(deleteLabRefreshed())}
        error={deleteLabError}
        success={
          deleteLabStatus === "succeeded" ? "Delete lab successfully" : null
        }
        title="Do you want to delete the lab?"
      />
      {fetchLabStatus === "loading" || fetchLabStatus === "failed" ? (
        <Spinner />
      ) : (
        <Grid container justify="center">
          <Grid item xs={11}>
            <Paper component="form" className={classes.paper}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                onChange={handleSearch}
                className={classes.input}
                placeholder="Enter lab name"
                inputProps={{
                  "aria-label": "enter lab name",
                }}
              />
            </Paper>
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            <LabTable
              onAddLab={() => setOpenedLabDialog(true)}
              labs={searchResult}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Lab;

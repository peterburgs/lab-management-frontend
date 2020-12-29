import React, { useState, useEffect, useCallback } from "react";
import useStyles from "./LecturerRegistration.styles";
import {
  Grid,
  Paper,
  IconButton,
  InputBase,
  Snackbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TeachingTable from "./TeachingTable/TeachingTable";
import TeachingDialog from "./TeachingDialog/TeachingDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  fetchTeaching,
  setTeachingIdToEdit,
  setTeachingIdToDelete,
  fetchTeachingRefreshed,
  deleteTeaching,
  deleteTeachingRefreshed,
  fetchSemester,
  fetchSemesterRefreshed,
  fetchOpeningRegistration,
  fetchOpeningRegistrationRefreshed,
} from "./LecturerRegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
import RefreshIcon from "@material-ui/icons/Refresh";

const useFetchOpeningRegistration = () => {
  const dispatch = useDispatch();

  const fetchOpeningRegistrationStatus = useSelector(
    (state) =>
      state.lecturerRegistration.fetchOpeningRegistrationStatus
  );
  const fetchOpeningRegistrationError = useSelector(
    (state) =>
      state.lecturerRegistration.fetchOpeningRegistrationError
  );

  useEffect(() => {
    if (fetchOpeningRegistrationStatus === "idle") {
      (async () => {
        try {
          const fetchOpeningRegistrationResult = await dispatch(
            fetchOpeningRegistration()
          );
          unwrapResult(fetchOpeningRegistrationResult);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (
        fetchOpeningRegistrationStatus === "failed" ||
        fetchOpeningRegistrationStatus === "succeeded"
      ) {
        dispatch(fetchOpeningRegistrationRefreshed());
      }
    };
  }, [dispatch, fetchOpeningRegistrationStatus]);

  return [
    fetchOpeningRegistrationStatus,
    fetchOpeningRegistrationError,
  ];
};

const useFetchSemester = () => {
  const dispatch = useDispatch();

  const fetchSemesterStatus = useSelector(
    (state) => state.lecturerRegistration.fetchSemesterStatus
  );
  const fetchSemesterError = useSelector(
    (state) => state.lecturerRegistration.fetchSemesterError
  );

  useEffect(() => {
    if (fetchSemesterStatus === "idle") {
      (async () => {
        try {
          const fetchSemesterResult = await dispatch(fetchSemester());
          unwrapResult(fetchSemesterResult);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (
        fetchSemesterStatus === "failed" ||
        fetchSemesterStatus === "succeeded"
      ) {
        dispatch(fetchSemesterRefreshed());
      }
    };
  }, [dispatch, fetchSemesterStatus]);

  return [fetchSemesterStatus, fetchSemesterError];
};

const useFetchTeaching = () => {
  const dispatch = useDispatch();

  const fetchTeachingStatus = useSelector(
    (state) => state.lecturerRegistration.fetchTeachingStatus
  );
  const fetchTeachingError = useSelector(
    (state) => state.lecturerRegistration.fetchTeachingError
  );

  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    if (fetchTeachingStatus === "idle") {
      (async () => {
        try {
          const fetchTeachingResult = await dispatch(
            fetchTeaching(userId)
          );
          unwrapResult(fetchTeachingResult);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (
        fetchTeachingStatus === "failed" ||
        fetchTeachingStatus === "succeeded"
      ) {
        dispatch(fetchTeachingRefreshed());
      }
    };
  }, [dispatch, fetchTeachingStatus]);

  return [fetchTeachingStatus, fetchTeachingError];
};

const useDeleteTeaching = () => {
  const dispatch = useDispatch();

  const deleteTeachingStatus = useSelector(
    (state) => state.lecturerRegistration.deleteTeachingStatus
  );
  const deleteTeachingError = useSelector(
    (state) => state.lecturerRegistration.deleteTeachingError
  );

  const handleDeleteTeaching = async (teachingId) => {
    try {
      const deleteTeachingRes = await dispatch(
        deleteTeaching(teachingId)
      );
      unwrapResult(deleteTeachingRes);
    } catch (err) {
      console.log(err);
    }
  };

  return [
    deleteTeachingStatus,
    deleteTeachingError,
    handleDeleteTeaching,
  ];
};

const LecturerRegistration = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openedTeachingDialog, setOpenedTeachingDialog] = useState(
    false
  );

  // Application state
  const teachings = useSelector(
    (state) => state.lecturerRegistration.teachings
  );
  const teachingIdToDelete = useSelector(
    (state) => state.lecturerRegistration.teachingIdToDelete
  );
  const teachingIdToEdit = useSelector(
    (state) => state.lecturerRegistration.teachingIdToEdit
  );

  // Fetch Teaching state
  const [
    fetchTeachingStatus,
    fetchTeachingError,
  ] = useFetchTeaching();

  // Fetch Semester state
  const [
    fetchSemesterStatus,
    fetchSemesterError,
  ] = useFetchSemester();

  // Fetch opening registration state
  const [
    fetchOpeningRegistrationStatus,
    fetchOpeningRegistrationError,
  ] = useFetchOpeningRegistration();

  // Delete Teaching state
  const [
    deleteTeachingStatus,
    deleteTeachingError,
    handleDeleteTeaching,
  ] = useDeleteTeaching();

  const handleDelete = useCallback(async () => {
    await handleDeleteTeaching(teachingIdToDelete);
    dispatch(setTeachingIdToDelete(null));
  }, [handleDeleteTeaching, dispatch, teachingIdToEdit]);

  const handleClose = () => {
    batch(() => {
      dispatch(fetchTeachingRefreshed());
      dispatch(fetchSemesterRefreshed());
    });
  };

  const openingRegistration = useSelector(
    (state) => state.lecturerRegistration.openingRegistration
  );

  const content = openingRegistration ? (
    <TeachingTable
      onAddTeaching={() => setOpenedTeachingDialog(true)}
      teachings={teachings}
    />
  ) : (
    <Paper component="form" className={classes.paper}>
      <Typography className={classes.text}>
        No Registration is available at this time!
      </Typography>
    </Paper>
  );

  return (
    <div className={classes.teaching}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={
          fetchTeachingStatus === "failed" ||
          fetchSemesterStatus === "failed" ||
          fetchOpeningRegistrationStatus === "failed"
            ? true
            : false
        }
        autoHideDuration={5000}
        message={
          fetchTeachingError
            ? fetchTeachingError
            : fetchSemesterError
            ? fetchSemesterError
            : fetchOpeningRegistrationStatus
        }
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <TeachingDialog
        isOpen={teachingIdToEdit ? true : openedTeachingDialog}
        onCancel={() => {
          teachingIdToEdit
            ? dispatch(setTeachingIdToEdit(null))
            : setOpenedTeachingDialog(false);
        }}
        onFinish={() => {
          teachingIdToEdit
            ? dispatch(setTeachingIdToEdit(null))
            : setOpenedTeachingDialog(false);
        }}
      />
      <ConfirmDialog
        isOpen={Boolean(teachingIdToDelete)}
        onCancel={() => dispatch(setTeachingIdToDelete(null))}
        onSubmit={handleDelete}
        onLoading={deleteTeachingStatus === "loading"}
        onClose={() => dispatch(deleteTeachingRefreshed())}
        error={deleteTeachingError}
        success={
          deleteTeachingStatus === "succeeded"
            ? "Delete Teaching successfully"
            : null
        }
        title="Do you want to delete the teaching?"
      />
      {fetchTeachingStatus === "loading" ||
      fetchTeachingStatus === "failed" ? (
        <Spinner />
      ) : (
        <Grid container justify="center">
          <Grid item xs={11}>
            {/* <Paper component="form" className={classes.paper}>
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
                placeholder="Enter teaching name"
                inputProps={{
                  "aria-label": "enter teaching name",
                }}
              />
            </Paper> */}
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {content}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default LecturerRegistration;

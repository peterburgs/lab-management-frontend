import {
  Grid,
  Snackbar,
  IconButton,
  Typography,
  EditIcon,
  Paper,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TeachingTable from "./TeachingTable/TeachingTable";
import TeachingDialog from "./TeachingDialog/TeachingDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSemester,
  fetchSemesterRefreshed,
} from "./LecturerRegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
import Semester from "../../components/Semester/Semester";
import RegistrationToolbar from "../../components/RegistrationToolbar/RegistrationToolbar";
import RefreshIcon from "@material-ui/icons/Refresh";
import useStyles from "./LecturerRegistration.styles";

const secondsToDhms = (seconds) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d === 1 ? " d " : " d ") : "";
  const hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hr ") : "";
  const mDisplay = m > 0 ? m + (m === 1 ? " m " : " m ") : "";
  const sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

const useFetchSemester = () => {
  const dispatch = useDispatch();
  const fetchSemesterStatus = useSelector(
    (state) => state.registration.fetchSemesterStatus
  );
  const fetchSemesterError = useSelector(
    (state) => state.registration.fetchSemesterError
  );

  useEffect(() => {
    if (fetchSemesterStatus === "idle") {
      (async () => {
        try {
          const res = await dispatch(fetchSemester());
          unwrapResult(res);
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

const LecturerRegistration = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // UI state
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(false);
  const [openedTeachingDialog, setOpenedTeachingDialog] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  // Application state
  const semester = useSelector((state) => state.lecturerRegistration.semester);
  const openingRegistration = useSelector((state) =>
    state.lecturerRegistration.semester
      ? state.lecturerRegistration.semester.registrations.find(
          (reg) => reg.isOpening === true
        )
      : null
  );

  const teachings = useSelector(
    (state) => state.lecturerRegistration.teachings
  );

  // Custom hook
  const [fetchSemesterStatus, fetchSemesterError] = useFetchSemester();

  useEffect(() => {
    const interval = () => {
      const seconds =
        (Date.parse(openingRegistration.endDate) - new Date()) / 1000;
      setRemainingTime(secondsToDhms(seconds));
    };

    if (openingRegistration) {
      setInterval(interval, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [openingRegistration]);

  const renderSemester = () => {
    if (semester) {
      return (
        <React.Fragment>
          <div className={classes.semester}>
            <Typography
              display="inline"
              style={{ color: "white", fontSize: 20, fontWeight: 700 }}
            >
              {semester.semesterName}
            </Typography>
          </div>
          <Typography
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Start date: {new Date(semester.startDate).toLocaleString()}
          </Typography>
          <Typography
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Number of weeks: {semester.numberOfWeeks}
          </Typography>
        </React.Fragment>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={fetchSemesterStatus === "failed" ? true : false}
        autoHideDuration={6000}
        message={fetchSemesterError}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => dispatch(fetchSemesterRefreshed())}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <TeachingDialog
        isOpen={openedTeachingDialog}
        onCancel={() => setOpenedTeachingDialog(false)}
        onFinish={() => setOpenedTeachingDialog(false)}
      />
      {/* <ConfirmDialog
        isOpen={openedConfirmDialog}
        onCancel={handleConfirmDialogCancelButtonClick}
        onSubmit={handleConfirmDialogSubmitButtonClick}
        title="Do you want to close this registration"
      /> */}
      {fetchSemesterStatus === "loading" || fetchSemesterStatus === "failed" ? (
        <div style={{ paddingTop: "5rem" }}>
          <Spinner />
        </div>
      ) : (
        <Grid container justify="center">
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {renderSemester()}
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {openingRegistration ? (
              <Paper
                className={classes.paper}
                style={{ justifyContent: "flex-start" }}
              >
                <Typography style={{ marginLeft: "0.5rem" }}>
                  This registration will auto close after
                </Typography>
                <Typography style={{ marginLeft: "0.2rem", color: "#e7305b" }}>
                  {remainingTime}
                </Typography>
              </Paper>
            ) : (
              <Paper
                className={classes.paper}
                style={{ justifyContent: "flex-start" }}
              >
                <Typography color="primary" style={{ margin: "auto" }}>
                  There is no registration
                </Typography>
              </Paper>
            )}
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {openingRegistration ? (
              <TeachingTable teachings={teachings} />
            ) : null}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default LecturerRegistration;

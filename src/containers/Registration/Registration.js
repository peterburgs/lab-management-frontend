import { Grid, Snackbar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import RegistrationTable from "./RegistrationTable/RegistrationTable";
import RegistrationDialog from "./RegistrationDialog/RegistrationDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import SemesterDialog from "./SemesterDialog/SemesterDialog";
import { useSelector, useDispatch } from "react-redux";
import { fetchSemester, fetchSemesterRefreshed } from "./RegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
import Semester from "../../components/Semester/Semester";
import RegistrationToolbar from "../../components/RegistrationToolbar/RegistrationToolbar";
import RefreshIcon from "@material-ui/icons/Refresh";

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

const Registration = () => {
  const dispatch = useDispatch();

  // UI state
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(false);
  const [openedRegistrationDialog, setOpenedRegistrationDialog] = useState(
    false
  );
  const [openedSemesterDialog, setOpenedSemesterDialog] = useState(false);
  const [isEditSemester, setIsEditSemester] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  // Application state
  const semester = useSelector((state) => state.registration.semester);
  const openingRegistration = useSelector((state) =>
    state.semester
      ? state.semester.registrations.find((reg) => reg.isOpening === true)
      : null
  );
  const teachings = useSelector((state) => state.registration.teachings);

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

  let registrations = null;

  if (semester) {
    registrations = semester.registrations.map((reg) => (
      <RegistrationTable key={reg.key} teachings={teachings} />
    ));
  }

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
      <RegistrationDialog
        isOpen={openedRegistrationDialog}
        onCancel={() => setOpenedRegistrationDialog(false)}
        onFinish={() => setOpenedRegistrationDialog(false)}
      />
      <SemesterDialog
        onCancel={() => setOpenedSemesterDialog(false)}
        onFinish={() => setOpenedSemesterDialog(false)}
        isEdit={isEditSemester}
        semester={semester}
        isOpen={openedSemesterDialog}
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
            <Semester
              semester={semester}
              onEdit={() => {
                setIsEditSemester(true);
                setOpenedSemesterDialog(true);
              }}
              onStart={() => {
                setIsEditSemester(false);
                setOpenedSemesterDialog(true);
              }}
            />
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {semester ? (
              <RegistrationToolbar
                remainingTime={remainingTime}
                openingRegistration={openingRegistration}
                onOpenRegistration={() => setOpenedRegistrationDialog(true)}
              />
            ) : null}
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {registrations}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Registration;

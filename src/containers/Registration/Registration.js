import {
  Grid,
  Snackbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import RegistrationTable from "./RegistrationTable/RegistrationTable";
import RegistrationDialog from "./RegistrationDialog/RegistrationDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import SemesterDialog from "./SemesterDialog/SemesterDialog";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  fetchSemester,
  fetchSemesterRefreshed,
  closeRegistration,
  closeRegistrationRefreshed,
  setRegistrationToGenerate,
} from "./RegistrationSlice";
import {
  setTeachingIdToEdit,
  setTeachingIdToDelete,
  deleteTeaching,
  deleteTeachingRefreshed,
} from "../LecturerRegistration/LecturerRegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
import Semester from "../../components/Semester/Semester";
import RegistrationToolbar from "../../components/RegistrationToolbar/RegistrationToolbar";
import RefreshIcon from "@material-ui/icons/Refresh";
import TeachingDialog from "../LecturerRegistration/TeachingDialog/TeachingDialog";
import _ from "lodash";
import GenerateScheduleDialog from "./GenerateScheduleDialog/GenerateScheduleDialog";

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

const useCloseRegistration = () => {
  const dispatch = useDispatch();
  const closeRegistrationStatus = useSelector(
    (state) => state.registration.closeRegistrationStatus
  );
  const closeRegistrationError = useSelector(
    (state) => state.registration.closeRegistrationError
  );

  const handleCloseRegistration = async () => {
    try {
      const res = await dispatch(closeRegistration());
      unwrapResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return [
    closeRegistrationStatus,
    closeRegistrationError,
    handleCloseRegistration,
  ];
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

const Registration = () => {
  const dispatch = useDispatch();

  // UI state
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(
    false
  );
  const [openedTeachingDialog, setOpenedTeachingDialog] = useState(
    false
  );
  const [
    openedGenerateScheduleDialog,
    setOpenedGenerateScheduleDialog,
  ] = useState(false);
  const [
    openedRegistrationDialog,
    setOpenedRegistrationDialog,
  ] = useState(false);
  const [openedSemesterDialog, setOpenedSemesterDialog] = useState(
    false
  );
  const [remainingTime, setRemainingTime] = useState("");

  // Application state
  const semester = useSelector(
    (state) => state.registration.semester
  );
  const openingRegistration = useSelector((state) =>
    state.registration.semester
      ? state.registration.semester.registrations.find(
          (reg) => reg.isOpening === true
        )
      : null
  );
  const teachingIdToDelete = useSelector(
    (state) => state.lecturerRegistration.teachingIdToDelete
  );
  const teachingIdToEdit = useSelector(
    (state) => state.lecturerRegistration.teachingIdToEdit
  );

  // Custom hook
  const [
    fetchSemesterStatus,
    fetchSemesterError,
  ] = useFetchSemester();
  const [
    closeRegistrationStatus,
    closeRegistrationError,
    handleCloseRegistration,
  ] = useCloseRegistration();

  const [
    deleteTeachingStatus,
    deleteTeachingError,
    handleDeleteTeaching,
  ] = useDeleteTeaching();

  const handleClose = useCallback(async () => {
    await handleCloseRegistration();
    setOpenedConfirmDialog(false);
  }, [handleCloseRegistration]);

  const handleDelete = useCallback(async () => {
    await handleDeleteTeaching(teachingIdToDelete);
    dispatch(setTeachingIdToDelete(null));
  }, [handleDeleteTeaching, dispatch, teachingIdToEdit]);

  const handleFinish = async (s) => {
    setOpenedGenerateScheduleDialog(false);
    if (s !== null) {
      if (s.registrations.find((reg) => reg.isOpening === true)) {
        await handleCloseRegistration();
      }
    }
  };

  useEffect(() => {
    let interval = null;

    if (openingRegistration) {
      interval = setInterval(() => {
        const seconds =
          (Date.parse(openingRegistration.endDate) - new Date()) /
          1000;
        if (seconds <= 0) {
          console.log("Close reg");
          (async () => {
            await handleClose();
          })();
        } else {
          setRemainingTime(secondsToDhms(seconds));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [openingRegistration, handleClose]);

  let registrationsRender = null;

  if (semester) {
    registrationsRender = _.cloneDeep(semester.registrations)
      .sort((a, b) => b.patch - a.patch)
      .map((reg, index) => (
        <div key={reg._id}>
          {index === 0 ? (
            <Typography
              variant="h6"
              style={{ marginBottom: "0.5rem", color: "white" }}
            >
              {new Date(reg.startDate).toDateString()} -{" "}
              {new Date(reg.endDate).toDateString()}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              style={{ marginBottom: "0.5rem", color: "black" }}
            >
              {new Date(reg.startDate).toDateString()} -{" "}
              {new Date(reg.endDate).toDateString()}
            </Typography>
          )}
          <RegistrationTable
            title={`Registration patch ${reg.patch}`}
            isOpening={reg.isOpening}
            teachings={reg.teachings}
            onGenerateSchedule={() => {
              dispatch(setRegistrationToGenerate(reg._id));
              setOpenedGenerateScheduleDialog(true);
            }}
          />
        </div>
      ));
  }

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={
          fetchSemesterStatus === "failed" ||
          closeRegistrationStatus === "failed"
            ? true
            : false
        }
        autoHideDuration={6000}
        message={
          fetchSemesterError
            ? fetchSemesterError
            : closeRegistrationError
        }
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                batch(() => {
                  dispatch(fetchSemesterRefreshed());
                  dispatch(closeRegistrationRefreshed());
                });
              }}
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
      <GenerateScheduleDialog
        isOpen={openedGenerateScheduleDialog}
        onCancel={() => setOpenedGenerateScheduleDialog(false)}
        onFinish={() => handleFinish(semester)}
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
      <RegistrationDialog
        isOpen={openedRegistrationDialog}
        onCancel={() => setOpenedRegistrationDialog(false)}
        onFinish={() => setOpenedRegistrationDialog(false)}
      />
      <SemesterDialog
        onCancel={() => setOpenedSemesterDialog(false)}
        onFinish={() => setOpenedSemesterDialog(false)}
        isOpen={openedSemesterDialog}
      />
      <ConfirmDialog
        isOpen={openedConfirmDialog}
        onCancel={() => setOpenedConfirmDialog(false)}
        onSubmit={handleClose}
        onLoading={closeRegistrationStatus === "loading"}
        onClose={() => dispatch(closeRegistrationRefreshed())}
        error={closeRegistrationError}
        success={
          closeRegistrationStatus === "succeeded"
            ? "Close registration successfully"
            : null
        }
        title="Do you want to close the registration?"
      />
      {fetchSemesterStatus === "loading" ||
      fetchSemesterStatus === "failed" ? (
        <div style={{ paddingTop: "5rem" }}>
          <Spinner />
        </div>
      ) : (
        <Grid container justify="center">
          <Grid style={{ marginTop: 24 }} item xs={11}>
            <Semester
              semester={semester}
              onEdit={() => {
                setOpenedSemesterDialog(true);
              }}
              onStart={() => {
                setOpenedSemesterDialog(true);
              }}
            />
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {semester ? (
              <RegistrationToolbar
                remainingTime={remainingTime}
                openingRegistration={openingRegistration}
                onOpenRegistration={() =>
                  setOpenedRegistrationDialog(true)
                }
                onCloseRegistration={() =>
                  setOpenedConfirmDialog(true)
                }
                closeRegistrationStatus={closeRegistrationStatus}
              />
            ) : null}
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            {registrationsRender}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Registration;

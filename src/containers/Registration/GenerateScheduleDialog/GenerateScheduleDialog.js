import React, { useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import useStyles from "./GenerateScheduleDialog.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  generateSchedule,
  generateScheduleRefreshed,
} from "../RegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useGenerateSchedule = () => {
  const dispatch = useDispatch();

  const generateScheduleStatus = useSelector(
    (state) => state.registration.generateScheduleStatus
  );
  const generateScheduleError = useSelector(
    (state) => state.registration.generateScheduleError
  );

  const handleGenerateSchedule = async (isNew) => {
    try {
      const res = await dispatch(generateSchedule(isNew));
      unwrapResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return [
    generateScheduleStatus,
    generateScheduleError,
    handleGenerateSchedule,
  ];
};

const GenerateScheduleDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [
    generateScheduleStatus,
    generateScheduleError,
    handleGenerateSchedule,
  ] = useGenerateSchedule();

  const handleSubmit = useCallback(async (data) => {
    await handleGenerateSchedule(data);
    props.onFinish();
  }, []);

  const handleClose = useCallback(() => {
    dispatch(generateScheduleRefreshed());
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={generateScheduleStatus === "failed" ? true : false}
        onClose={() => handleClose()}
        message={generateScheduleError}
        severity="error"
      />
      <CustomizedSnackbar
        open={generateScheduleStatus === "succeeded" ? true : false}
        onClose={() => handleClose()}
        message={"Generate schedule successfully"}
        severity="success"
      />
      <Dialog
        classes={{ paper: classes.dialog }}
        open={props.isOpen}
        TransitionComponent={Transition}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {generateScheduleStatus === "loading"
            ? "Generating Schedule..."
            : "Generate Schedule"}
        </DialogTitle>
        {generateScheduleStatus === "loading" ? (
          <CircularProgress
            style={{ marginTop: "0.5rem" }}
            size={24}
            className={classes.buttonProgress}
          />
        ) : (
          <DialogActions style={{ padding: "16px 24px" }}>
            <div style={{ position: "relative" }}>
              <Button
                variant="contained"
                disableElevation
                style={{ borderRadius: 8, fontWeight: 700 }}
                color="primary"
                onClick={() => handleSubmit(true)}
                disabled={generateScheduleStatus === "loading"}
              >
                Create new
              </Button>
              {generateScheduleStatus === "loading" && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <div style={{ position: "relative" }}>
              <Button
                variant="contained"
                disableElevation
                style={{ borderRadius: 8, fontWeight: 700 }}
                color="primary"
                onClick={() => handleSubmit(false)}
                disabled={generateScheduleStatus === "loading"}
              >
                Based on Existing
              </Button>
              {generateScheduleStatus === "loading" && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default GenerateScheduleDialog;

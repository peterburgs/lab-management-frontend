import React, { useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import useStyles from "./SemesterDialog.styles";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  startSemester,
  startSemesterRefreshed,
  updateSemester,
  updateSemesterRefreshed,
} from "../RegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// Hook to handle update semester
const useUpdateSemester = () => {
  const dispatch = useDispatch();

  const updateSemesterStatus = useSelector(
    (state) => state.registration.updateSemesterStatus
  );
  const updateSemesterError = useSelector(
    (state) => state.registration.updateSemesterError
  );

  const handleUpdateSemester = useCallback(
    async (semester) => {
      try {
        const res = await dispatch(updateSemester(semester));
        unwrapResult(res);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return [updateSemesterStatus, updateSemesterError, handleUpdateSemester];
};

// Hook to handle start semester
const useStartSemester = () => {
  const dispatch = useDispatch();

  const startSemesterStatus = useSelector(
    (state) => state.registration.startSemesterStatus
  );
  const startSemesterError = useSelector(
    (state) => state.registration.startSemesterError
  );

  const handleStartSemester = useCallback(
    async (semester) => {
      try {
        const res = await dispatch(startSemester(semester));
        unwrapResult(res);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return [startSemesterStatus, startSemesterError, handleStartSemester];
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SemesterDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control } = useForm();
  const [
    updateSemesterStatus,
    updateSemesterError,
    handleUpdateSemester,
  ] = useUpdateSemester();

  const [
    startSemesterStatus,
    startSemesterError,
    handleStartSemester,
  ] = useStartSemester();

  const semester = useSelector((state) => state.registration.semester);

  const onSubmit = async (data) => {
    if (semester) {
      await handleUpdateSemester(data);
      props.onFinish();
    } else {
      await handleStartSemester(data);
      props.onFinish();
    }
  };

  const handleClose = useCallback(() => {
    batch(() => {
      dispatch(updateSemesterRefreshed());
      dispatch(startSemesterRefreshed());
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={
          updateSemesterStatus === "failed" || startSemesterStatus === "failed"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          updateSemesterStatus === "failed"
            ? updateSemesterError
            : startSemesterError
        }
        severity="error"
      />
      <CustomizedSnackbar
        open={
          updateSemesterStatus === "succeeded" ||
          startSemesterStatus === "succeeded"
            ? true
            : false
        }
        onClose={() => handleClose(props.isEdit)}
        message={
          updateSemesterStatus === "succeeded"
            ? "Update semester successfully"
            : "Start semester successfully"
        }
        severity="success"
      />
      <Dialog
        classes={{ paper: classes.dialog }}
        open={props.isOpen}
        TransitionComponent={Transition}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">
            {semester ? "Edit semester" : "Start a semester"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="semesterName"
              name="semesterName"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Semester name"
              variant="outlined"
              defaultValue={semester ? semester.semesterName : null}
              className={classes.formElement}
              error={Boolean(errors.semesterName)}
              helperText={
                errors.semesterName ? "*This field is required" : null
              }
            />
            <Controller
              name="startDate"
              control={control}
              defaultValue={semester ? semester.startDate : null}
              rules={{ required: true }}
              render={(props) => (
                <DateTimePicker
                  label="Start date"
                  inputVariant="outlined"
                  format="DD/MM/yyyy HH:mm"
                  className={classes.formElement}
                  onChange={(value) => props.onChange(value)}
                  value={props.value}
                />
              )}
            />
            <TextField
              id="numberOfWeeks"
              name="numberOfWeeks"
              label="Number of weeks"
              variant="outlined"
              defaultValue={semester ? semester.numberOfWeeks : null}
              inputRef={register({ required: true })}
              className={classes.formElement}
              error={Boolean(errors.numberOfWeeks)}
              helperText={
                errors.numberOfWeeks ? "*This field is required" : null
              }
            />
          </DialogContent>
          <DialogActions style={{ padding: "16px 24px" }}>
            <Button type="button" onClick={props.onCancel} color="primary">
              Cancel
            </Button>
            <div style={{ position: "relative" }}>
              <Button
                variant="contained"
                disableElevation
                style={{ borderRadius: 8, fontWeight: 700 }}
                color="primary"
                type="submit"
                disabled={updateSemesterStatus === "loading"}
              >
                Submit
              </Button>
              {(updateSemesterStatus === "loading" ||
                startSemesterStatus === "loading") && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default SemesterDialog;

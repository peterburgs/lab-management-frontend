import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import useStyles from "./TeachingDialog.styles";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  addTeaching,
  addTeachingRefreshed,
  updateTeaching,
  updateTeachingRefreshed,
  getTeachingById,
} from "../LecturerRegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useAddTeaching = () => {
  const dispatch = useDispatch();

  const addTeachingStatus = useSelector(
    (state) => state.lecturerRegistration.addTeachingStatus
  );
  const addTeachingError = useSelector(
    (state) => state.lecturerRegistration.addTeachingError
  );

  const handleAddTeaching = async (teaching) => {
    try {
      const res = await dispatch(addTeaching(teaching));
      unwrapResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return [addTeachingStatus, addTeachingError, handleAddTeaching];
};

const useUpdateTeaching = () => {
  const dispatch = useDispatch();

  const updateTeachingStatus = useSelector(
    (state) => state.lecturerRegistration.updateTeachingStatus
  );
  const updateTeachingError = useSelector(
    (state) => state.lecturerRegistration.updateTeachingError
  );

  const handleUpdateTeaching = async (teaching) => {
    try {
      const updateTeachingRes = await dispatch(
        updateTeaching(teaching)
      );
      unwrapResult(updateTeachingRes);
    } catch (err) {
      console.log(err);
    }
  };

  return [
    updateTeachingStatus,
    updateTeachingError,
    handleUpdateTeaching,
  ];
};

const TeachingDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
  } = useForm();
  const [
    addTeachingStatus,
    addTeachingError,
    handleAddTeaching,
  ] = useAddTeaching();

  const [
    updateTeachingStatus,
    updateTeachingError,
    handleUpdateTeaching,
  ] = useUpdateTeaching();

  const teachingIdToEdit = useSelector(
    (state) => state.lecturerRegistration.teachingIdToEdit
  );

  useEffect(() => {
    if (teachingIdToEdit) {
      (async () => {
        const result = await dispatch(
          getTeachingById(teachingIdToEdit)
        );
        unwrapResult(result);
        setValue("course", result.payload.teaching.course);
        setValue("group", result.payload.teaching.group);
        setValue(
          "numberOfStudents",
          result.payload.teaching.numberOfStudents
        );
        setValue("theoryRoom", result.payload.teaching.theoryRoom);
        setValue(
          "numberOfPracticalWeeks",
          result.payload.teaching.numberOfPracticalWeeks
        );
        setValue("dayOfWeek", result.payload.teaching.dayOfWeek);
        setValue("startPeriod", result.payload.teaching.startPeriod);
        setValue("endPeriod", result.payload.teaching.endPeriod);
      })();
    }
  }, [dispatch, teachingIdToEdit, setValue]);

  const onSubmit = async (data) => {
    if (teachingIdToEdit) {
      await handleUpdateTeaching(data);
      props.onFinish();
    } else {
      await handleAddTeaching(data);
      props.onFinish();
    }
  };

  const handleClose = useCallback(() => {
    batch(() => {
      dispatch(updateTeachingRefreshed());
      dispatch(addTeachingRefreshed());
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={
          addTeachingStatus === "failed" ||
          updateTeachingStatus === "failed"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          addTeachingStatus === "failed"
            ? addTeachingError
            : updateTeachingError
        }
        severity="error"
      />
      <CustomizedSnackbar
        open={
          addTeachingStatus === "succeeded" ||
          updateTeachingStatus === "succeeded"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          addTeachingStatus === "succeeded"
            ? "Add new teaching successfully"
            : "Update teaching successfully"
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
            {teachingIdToEdit ? "Edit teaching" : "Add new teaching"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="course"
              name="course"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Course ID"
              variant="outlined"
              defaultValue={teachingIdToEdit ? " " : ""}
              autoFocus={teachingIdToEdit ? true : false}
              className={classes.formElement}
              error={Boolean(errors.course)}
              helperText={
                errors.course ? "*This field is required" : null
              }
            />
            <TextField
              id="group"
              name="group"
              type="number"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Group"
              variant="outlined"
              defaultValue={teachingIdToEdit ? 0 : null}
              className={classes.formElement}
              error={Boolean(errors.group)}
              helperText={
                errors.group ? "*This field is required" : null
              }
            />
            <TextField
              id="numberOfStudents"
              name="numberOfStudents"
              type="number"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Number of students"
              variant="outlined"
              defaultValue={teachingIdToEdit ? 0 : null}
              className={classes.formElement}
              error={Boolean(errors.numberOfStudents)}
              helperText={
                errors.numberOfStudents
                  ? "*This field is required"
                  : null
              }
            />
            <TextField
              id="theoryRoom"
              name="theoryRoom"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Theory room"
              variant="outlined"
              defaultValue={teachingIdToEdit ? " " : ""}
              autoFocus={teachingIdToEdit ? true : false}
              className={classes.formElement}
              error={Boolean(errors.theoryRoom)}
              helperText={
                errors.theoryRoom ? "*This field is required" : null
              }
            />
            <TextField
              id="numberOfPracticalWeeks"
              name="numberOfPracticalWeeks"
              type="number"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Number of practical weeks"
              variant="outlined"
              defaultValue={teachingIdToEdit ? 0 : null}
              className={classes.formElement}
              error={Boolean(errors.numberOfPracticalWeeks)}
              helperText={
                errors.numberOfPracticalWeeks
                  ? "*This field is required"
                  : null
              }
            />
            <Controller
              name="dayOfWeek"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={(props) => (
                <FormControl
                  variant="outlined"
                  className={classes.formElement}
                >
                  <InputLabel id="dayOfWeek-label">
                    Day of week
                  </InputLabel>
                  <Select
                    labelId="dayOfWeek-label"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    label="Day of week"
                  >
                    <MenuItem value={0}>Monday</MenuItem>
                    <MenuItem value={1}>Tuesday</MenuItem>
                    <MenuItem value={2}>Wednesday</MenuItem>
                    <MenuItem value={3}>Thursday</MenuItem>
                    <MenuItem value={4}>Friday</MenuItem>
                    <MenuItem value={5}>Saturday</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="startPeriod"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={(props) => (
                <FormControl
                  variant="outlined"
                  className={classes.formElement}
                >
                  <InputLabel id="startPeriod-label">
                    Start period
                  </InputLabel>
                  <Select
                    labelId="startPeriod-label"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    label="Start period"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="endPeriod"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={(props) => (
                <FormControl
                  variant="outlined"
                  className={classes.formElement}
                >
                  <InputLabel id="endPeriod-label">
                    End period
                  </InputLabel>
                  <Select
                    labelId="endPeriod-label"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    label="End period"
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </DialogContent>
          <DialogActions style={{ padding: "16px 24px" }}>
            <Button onClick={props.onCancel} color="primary">
              Cancel
            </Button>
            <div style={{ position: "relative" }}>
              <Button
                variant="contained"
                disableElevation
                style={{ borderRadius: 8, fontWeight: 700 }}
                color="primary"
                type="submit"
                disabled={
                  addTeachingStatus === "loading" ||
                  updateTeachingStatus === "loading"
                }
              >
                Submit
              </Button>
              {(addTeachingStatus === "loading" ||
                updateTeachingStatus === "loading") && (
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

export default TeachingDialog;

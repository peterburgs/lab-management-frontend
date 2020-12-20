import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import useStyles from "./CourseDialog.styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  addCourseRefreshed,
  updateCourse,
} from "../CourseSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouteMatch } from "react-router-dom";
import { getCourseById } from "../CourseSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useAddCourse = () => {
  const dispatch = useDispatch();

  const addCourseStatus = useSelector(
    (state) => state.courses.addCourseStatus
  );
  const addCourseError = useSelector(
    (state) => state.courses.addCourseError
  );

  const handleAddCourse = useCallback(
    async (course) => {
      try {
        const res = await dispatch(addCourse(course));
        unwrapResult(res);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return [addCourseStatus, addCourseError, handleAddCourse];
};

const useUpdateCourse = () => {
  const dispatch = useDispatch();

  const updateCourseStatus = useSelector(
    (state) => state.courses.updateCourseStatus
  );
  const updateCourseError = useSelector(
    (state) => state.courses.updateCourseError
  );

  const handleUpdateCourse = useCallback(
    async (course) => {
      try {
        const res = await dispatch(updateCourse(course));
        unwrapResult(res);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return [updateCourseStatus, updateCourseError, handleUpdateCourse];
};

const CourseDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
  } = useForm();
  const [
    addCourseStatus,
    addCourseError,
    handleAddCourse,
  ] = useAddCourse();

  const [
    updateCourseStatus,
    updateCourseError,
    handleUpdateCourse,
  ] = useUpdateCourse();

  const match = useRouteMatch();

  useEffect(async () => {
    if (props.isEdit) {
      const result = await dispatch(getCourseById(match.params));
      unwrapResult(result);
      console.log(result);
      setValue("courseName", result.payload.course.courseName);
      setValue("courseId", result.payload.course._id);
      setValue(
        "numberOfCredit",
        result.payload.course.numberOfCredit
      );
    }
  }, [dispatch, props.isEdit]);

  const onSubmit = async (data) => {
    if (props.isEdit) {
      await handleUpdateCourse(data);
      props.onFinish();
    } else {
      await handleAddCourse(data);
      props.onFinish();
    }
  };

  const handleClose = useCallback(() => {
    dispatch(addCourseRefreshed());
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={
          addCourseStatus === "failed" ||
          updateCourseStatus === "failed"
            ? true
            : false
        }
        onClose={() => handleClose(props.isEdit)}
        message={addCourseError}
        severity="error"
      />
      <CustomizedSnackbar
        open={
          addCourseStatus === "succeeded" ||
          updateCourseStatus === "succeeded"
            ? true
            : false
        }
        onClose={() => handleClose(props.isEdit)}
        message={
          props.isEdit
            ? "Update course successfully"
            : "Add course successfully"
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
            {props.isEdit ? "Edit course" : "Add a course"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="courseId"
              name="courseId"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Course ID"
              variant="outlined"
              defaultValue={props.isEdit ? " " : ""}
              autoFocus={props.isEdit ? true : false}
              className={classes.formElement}
              error={Boolean(errors.courseName)}
              helperText={
                errors.courseName ? "*This field is required" : null
              }
            />

            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Course name"
              variant="outlined"
              defaultValue={props.isEdit ? " " : ""}
              className={classes.formElement}
              error={Boolean(errors.courseName)}
              helperText={
                errors.courseName ? "*This field is required" : null
              }
            />
            <TextField
              id="numberOfCredit"
              name="numberOfCredit"
              type="number"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Credits"
              variant="outlined"
              defaultValue={props.isEdit ? 0 : null}
              className={classes.formElement}
              error={Boolean(errors.numberOfCredit)}
              helperText={
                errors.numberOfCredit
                  ? "*This field is required"
                  : null
              }
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
                disabled={addCourseStatus === "loading"}
              >
                Submit
              </Button>
              {(addCourseStatus === "loading" ||
                updateCourseStatus === "loading") && (
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

CourseDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default CourseDialog;

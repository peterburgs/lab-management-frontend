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
import { useDispatch, useSelector, batch } from "react-redux";
import {
  addCourse,
  addCourseRefreshed,
  updateCourse,
  updateCourseRefreshed,
  getCourseById,
} from "../CourseSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useAddCourse = () => {
  const dispatch = useDispatch();

  const addCourseStatus = useSelector((state) => state.courses.addCourseStatus);
  const addCourseError = useSelector((state) => state.courses.addCourseError);

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
        const updateCourseRes = await dispatch(updateCourse(course));
        unwrapResult(updateCourseRes);
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
  const { register, handleSubmit, errors, setValue } = useForm();
  const [addCourseStatus, addCourseError, handleAddCourse] = useAddCourse();

  const [
    updateCourseStatus,
    updateCourseError,
    handleUpdateCourse,
  ] = useUpdateCourse();

  const courseIdToEdit = useSelector((state) => state.courses.courseIdToEdit);

  useEffect(() => {
    if (courseIdToEdit) {
      (async () => {
        const result = await dispatch(getCourseById(courseIdToEdit));
        unwrapResult(result);
        setValue("courseName", result.payload.course.courseName);
        setValue("courseId", result.payload.course._id);
        setValue("numberOfCredits", result.payload.course.numberOfCredits);
      })();
    }
  }, [dispatch, courseIdToEdit, setValue]);

  const onSubmit = async (data) => {
    if (courseIdToEdit) {
      await handleUpdateCourse(data);
      props.onFinish();
    } else {
      await handleAddCourse(data);
      props.onFinish();
    }
  };

  const handleClose = useCallback(() => {
    batch(() => {
      dispatch(updateCourseRefreshed());
      dispatch(addCourseRefreshed());
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={
          addCourseStatus === "failed" || updateCourseStatus === "failed"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          addCourseStatus === "failed" ? addCourseError : updateCourseError
        }
        severity="error"
      />
      <CustomizedSnackbar
        open={
          addCourseStatus === "succeeded" || updateCourseStatus === "succeeded"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          addCourseStatus === "succeeded"
            ? "Add new course successfully"
            : "Update course successfully"
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
            {courseIdToEdit ? "Edit course" : "Add new course"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="courseId"
              name="courseId"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Course ID"
              variant="outlined"
              disabled={courseIdToEdit ? true : false}
              defaultValue={courseIdToEdit ? " " : ""}
              autoFocus={courseIdToEdit ? true : false}
              className={classes.formElement}
              error={Boolean(errors.courseId)}
              helperText={errors.courseId ? "*This field is required" : null}
            />

            <TextField
              id="courseName"
              name="courseName"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Course name"
              variant="outlined"
              defaultValue={courseIdToEdit ? " " : ""}
              className={classes.formElement}
              error={Boolean(errors.courseName)}
              helperText={errors.courseName ? "*This field is required" : null}
            />
            <TextField
              id="numberOfCredits"
              name="numberOfCredits"
              type="number"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Credits"
              variant="outlined"
              defaultValue={courseIdToEdit ? 0 : null}
              className={classes.formElement}
              error={Boolean(errors.numberOfCredits)}
              helperText={
                errors.numberOfCredits ? "*This field is required" : null
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
                disabled={
                  addCourseStatus === "loading" ||
                  updateCourseStatus === "loading"
                }
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

export default CourseDialog;

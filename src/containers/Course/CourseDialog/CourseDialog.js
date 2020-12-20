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
import useStyles from "./CourseDialog.styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, addCourseRefreshed } from "../CourseSlice";
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

const CourseDialog = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [addCourseStatus, addCourseError, handleAddCourse] = useAddCourse();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={props.isOpen}
      TransitionComponent={Transition}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      <form>
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
            defaultValue={props.course ? props.course._id : null}
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
            defaultValue={props.course ? props.course.name : null}
            className={classes.formElement}
            error={Boolean(errors.courseName)}
            helperText={errors.courseName ? "*This field is required" : null}
          />
          <TextField
            id="numberOfCredits"
            name="numberOfCredits"
            autoComplete="off"
            inputRef={register({ required: true })}
            label="Credits"
            variant="outlined"
            defaultValue={props.course ? props.course.numberOfCredits : null}
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
              disabled={addCourseStatus === "loading"}
            >
              Submit
            </Button>
            {addCourseStatus === "loading" && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

CourseDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default CourseDialog;

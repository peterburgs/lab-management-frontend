import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Slide,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid,
  IconButton,
  Chip,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import useStyles from "./RegistrationDialog.styles";
import produce from "immer";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import CheckboxList from "../../../components/CheckboxList/CheckboxList";
import { useSelector, useDispatch } from "react-redux";
import {
  openRegistration,
  openRegistrationRefreshed,
} from "../RegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useOpenRegistration = () => {
  const dispatch = useDispatch();

  const openRegistrationStatus = useSelector(
    (state) => state.registration.openRegistrationStatus
  );

  const openRegistrationError = useSelector(
    (state) => state.registration.openRegistrationError
  );

  const handleOpenRegistration = useCallback(
    async (registration) => {
      try {
        const res = await dispatch(openRegistration(registration));
        unwrapResult(res);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return [
    openRegistrationStatus,
    openRegistrationError,
    handleOpenRegistration,
  ];
};

const RegistrationDialog = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control } = useForm();
  const [
    openRegistrationStatus,
    openRegistrationError,
    handleOpenRegistration,
  ] = useOpenRegistration();

  const [isAllCoursesApplied, setIsAllCoursesApplied] = useState(true);
  const [courses, setCourses] = useState([]);
  const [courseToSearch, setCourseToSearch] = useState("");
  const [searchCourseResult, setSearchCourseResult] = useState([]);

  const handleDeleteCourse = (course) => {
    setCourses((courses) => {
      return courses.filter((c) => c !== course);
    });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClose = useCallback(() => {
    dispatch(openRegistrationRefreshed());
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={openRegistrationStatus === "failed" ? true : false}
        onClose={() => handleClose()}
        message={openRegistrationError}
        severity="error"
      />
      <CustomizedSnackbar
        open={openRegistrationStatus === "succeeded" ? true : false}
        onClose={() => handleClose()}
        message={"Open registration successfully"}
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
          <DialogTitle id="form-dialog-title">Open a registration</DialogTitle>
          <DialogContent>
            <DateTimePicker
              id="startDate"
              name="startDate"
              label="Start date"
              inputVariant="outlined"
              format="DD/MM/yyyy HH:mm"
              disablePast
              className={classes.formElement}
              inputRef={register({ required: true })}
            />
            <DateTimePicker
              id="endDate"
              name="endDate"
              label="End date"
              inputVariant="outlined"
              format="DD/MM/yyyy HH:mm"
              disablePast
              className={classes.formElement}
              inputRef={register({ required: true })}
            />
            <DialogContentText style={{ marginBottom: 0 }}>
              Apply to course
            </DialogContentText>
            <Controller
              name="allCourses"
              control={control}
              defaultValue={true}
              rules={{ required: true }}
              render={(props) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.value}
                      onChange={(e) => {
                        props.onChange(e.target.checked);
                        setIsAllCoursesApplied(e.target.checked);
                      }}
                      name="allCourses"
                    />
                  }
                  label="All courses"
                />
              )}
            />
            <Typography
              style={{ fontSize: 10, marginBottom: "1rem" }}
              color="secondary"
            ></Typography>
            {!isAllCoursesApplied ? (
              <div
                style={{
                  border: "2px solid #1A73E8",
                  borderRadius: 7,
                  padding: "0.5rem",
                }}
              >
                <TextField
                  id="searchCourse"
                  name="searchCourse"
                  autoComplete="off"
                  label="Search course"
                  variant="outlined"
                  value={courseToSearch}
                  onChange={(e) => setCourseToSearch(e.target.value)}
                  className={classes.formElement}
                />
                <CheckboxList />
              </div>
            ) : null}
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
                disabled={openRegistrationStatus === "loading"}
              >
                Submit
              </Button>
              {openRegistrationStatus === "loading" && (
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

export default RegistrationDialog;

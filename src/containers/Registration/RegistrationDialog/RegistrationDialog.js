import React, { useState, useCallback, useEffect } from "react";
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
  IconButton,
  Grid,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import useStyles from "./RegistrationDialog.styles";
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
import {
  fetchCourse,
  fetchCourseRefreshed,
} from "../../Course/CourseSlice";
import SearchIcon from "@material-ui/icons/Search";

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

  const handleOpenRegistration = async (registration) => {
    try {
      const res = await dispatch(openRegistration(registration));
      unwrapResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return [
    openRegistrationStatus,
    openRegistrationError,
    handleOpenRegistration,
  ];
};

const useFetchCourse = () => {
  const dispatch = useDispatch();

  const fetchCourseStatus = useSelector(
    (state) => state.courses.fetchCourseStatus
  );
  const fetchCourseError = useSelector(
    (state) => state.courses.fetchCourseError
  );

  useEffect(() => {
    if (fetchCourseStatus === "idle") {
      (async () => {
        try {
          const fetchCourseResult = await dispatch(fetchCourse());
          unwrapResult(fetchCourseResult);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (
        fetchCourseStatus === "failed" ||
        fetchCourseStatus === "succeeded"
      ) {
        dispatch(fetchCourseRefreshed());
      }
    };
  }, [dispatch, fetchCourseStatus]);

  return [fetchCourseStatus, fetchCourseError];
};

const RegistrationDialog = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const [
    openRegistrationStatus,
    openRegistrationError,
    handleOpenRegistration,
  ] = useOpenRegistration();

  const [isAllCoursesApplied, setIsAllCoursesApplied] = useState(
    true
  );
  const [courseToSearch, setCourseToSearch] = useState("");
  const [fetchCourseStatus, fetchCourseError] = useFetchCourse();

  // Application state
  const courses = useSelector((state) => state.courses.courses);

  const [coursesToSelect, setCoursesToSelect] = useState([]);

  useEffect(() => {
    setCoursesToSelect(
      courses.map((course) => {
        return { id: course._id, name: course.courseName };
      })
    );
  }, [courses]);

  const onSubmit = async (data) => {
    let registration = null;
    if (isAllCoursesApplied) {
      registration = {
        ...data,
        registrableCourses: courses.map((course) => course._id),
      };
    } else {
      registration = {
        ...data,
        registrableCourses: selectedCourses.map(
          (course) => course._id
        ),
      };
    }
    const timeDiff = new Date(data.endDate) - new Date();
    if (timeDiff <= 0) {
      alert("Invalid end date");
    } else {
      await handleOpenRegistration(registration);
      props.onFinish();
    }
  };

  const handleClose = useCallback(() => {
    dispatch(openRegistrationRefreshed());
  }, [dispatch]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSelectCourse = (value) => () => {
    const currentIndex = selectedCourses.findIndex(
      (course) => course.id === value.id
    );
    const newSelectedCourses = [...selectedCourses];

    if (currentIndex === -1) {
      newSelectedCourses.push(value);
    } else {
      newSelectedCourses.splice(currentIndex, 1);
    }

    setSelectedCourses(newSelectedCourses);
  };

  const handleSearchCourse = () => {
    if (courseToSearch) {
      setCoursesToSelect(
        courses
          .filter((c) => c._id === courseToSearch)
          .map((course) => {
            return { id: course._id, name: course.courseName };
          })
      );
    } else {
      setCoursesToSelect(
        courses.map((course) => {
          return { id: course._id, name: course.courseName };
        })
      );
    }
  };

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={
          openRegistrationStatus === "failed" ||
          fetchCourseError === "failed"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          openRegistrationError
            ? openRegistrationError
            : fetchCourseError
        }
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
          <DialogTitle id="form-dialog-title">
            Open a registration
          </DialogTitle>
          <DialogContent>
            <Controller
              name="startDate"
              control={control}
              defaultValue={new Date()}
              rules={{ required: true }}
              render={(props) => (
                <DateTimePicker
                  label="Start date"
                  inputVariant="outlined"
                  ampm={false}
                  format="DD/MM/yyyy HH:mm"
                  className={classes.formElement}
                  onChange={(value) => props.onChange(value)}
                  value={props.value}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              defaultValue={new Date()}
              rules={{ required: true }}
              render={(props) => (
                <DateTimePicker
                  label="End date"
                  inputVariant="outlined"
                  format="DD/MM/yyyy HH:mm"
                  ampm={false}
                  disablePast
                  disable
                  className={classes.formElement}
                  onChange={(value) => props.onChange(value)}
                  value={props.value}
                />
              )}
            />
            <DialogContentText style={{ marginBottom: 0 }}>
              Apply to course
            </DialogContentText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllCoursesApplied}
                  onChange={(e) => {
                    setIsAllCoursesApplied(e.target.checked);
                  }}
                  name="allCourses"
                />
              }
              label="All courses"
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
                <Grid container>
                  <Grid item xs={10}>
                    <TextField
                      id="searchCourse"
                      name="searchCourse"
                      autoComplete="off"
                      label="Enter course ID"
                      variant="outlined"
                      value={courseToSearch}
                      onChange={(e) =>
                        setCourseToSearch(e.target.value)
                      }
                      className={classes.formElement}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      textAlign: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={handleSearchCourse}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                {fetchCourseStatus === "loading" ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                  <CheckboxList
                    selectedItems={selectedCourses}
                    onSelectItem={handleSelectCourse}
                    items={coursesToSelect}
                  />
                )}
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

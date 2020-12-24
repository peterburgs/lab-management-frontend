import React, { useState, useEffect, useCallback } from "react";
import useStyles from "./Course.styles";
import {
  Grid,
  Paper,
  IconButton,
  InputBase,
  Snackbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CourseTable from "./CourseTable/CourseTable";
import CourseDialog from "./CourseDialog/CourseDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCourse,
  setCourseIdToEdit,
  setCourseIdToDelete,
  search,
  fetchCourseRefreshed,
  deleteCourse,
  deleteCourseRefreshed,
} from "./CourseSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
import RefreshIcon from "@material-ui/icons/Refresh";

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
      if (fetchCourseStatus === "failed" || fetchCourseStatus === "succeeded") {
        dispatch(fetchCourseRefreshed());
      }
    };
  }, [dispatch, fetchCourseStatus]);

  return [fetchCourseStatus, fetchCourseError];
};

const useDeleteCourse = () => {
  const dispatch = useDispatch();

  const deleteCourseStatus = useSelector(
    (state) => state.courses.deleteCourseStatus
  );
  const deleteCourseError = useSelector(
    (state) => state.courses.deleteCourseError
  );

  const handleDeleteCourse = useCallback(
    async (courseId) => {
      try {
        const deleteCourseRes = await dispatch(deleteCourse(courseId));
        unwrapResult(deleteCourseRes);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  return [deleteCourseStatus, deleteCourseError, handleDeleteCourse];
};

const Course = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openedCourseDialog, setOpenedCourseDialog] = useState(false);

  // Application state
  const searchResult = useSelector((state) => state.courses.searchResult);
  const courseIdToDelete = useSelector(
    (state) => state.courses.courseIdToDelete
  );
  const courseIdToEdit = useSelector((state) => state.courses.courseIdToEdit);

  // Fetch course state
  const [fetchCourseStatus, fetchCourseError] = useFetchCourse();

  // Delete course state
  const [
    deleteCourseStatus,
    deleteCourseError,
    handleDeleteCourse,
  ] = useDeleteCourse();

  const handleSearch = (e) => {
    dispatch(search(e.target.value));
  };

  const handleDelete = async () => {
    await handleDeleteCourse(courseIdToDelete);
    dispatch(setCourseIdToDelete(null));
  };

  return (
    <div className={classes.course}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={fetchCourseStatus === "failed" ? true : false}
        autoHideDuration={6000}
        message={fetchCourseError}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => dispatch(fetchCourseRefreshed())}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <CourseDialog
        isOpen={courseIdToEdit ? true : openedCourseDialog}
        onCancel={() => {
          courseIdToEdit
            ? dispatch(setCourseIdToEdit(null))
            : setOpenedCourseDialog(false);
        }}
        onFinish={() => {
          courseIdToEdit
            ? dispatch(setCourseIdToEdit(null))
            : setOpenedCourseDialog(false);
        }}
      />
      <ConfirmDialog
        isOpen={Boolean(courseIdToDelete)}
        onCancel={() => dispatch(setCourseIdToDelete(null))}
        onSubmit={handleDelete}
        onLoading={deleteCourseStatus === "loading"}
        onClose={() => dispatch(deleteCourseRefreshed())}
        error={deleteCourseError}
        success={
          deleteCourseStatus === "succeeded"
            ? "Delete course successfully"
            : null
        }
        title="Do you want to delete the course?"
      />
      {fetchCourseStatus === "loading" || fetchCourseStatus === "failed" ? (
        <Spinner />
      ) : (
        <Grid container justify="center">
          <Grid item xs={11}>
            <Paper component="form" className={classes.paper}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                onChange={handleSearch}
                className={classes.input}
                placeholder="Enter course name"
                inputProps={{
                  "aria-label": "enter course name",
                }}
              />
            </Paper>
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            <CourseTable
              onAddCourse={() => setOpenedCourseDialog(true)}
              courses={searchResult}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Course;

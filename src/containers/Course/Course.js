import React, { useState, useEffect } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import useStyles from "./Course.styles";
import {
  Grid,
  Paper,
  IconButton,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CourseTable from "./CourseTable/CourseTable";
import CourseDialog from "./CourseDialog/CourseDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourse } from "./CourseSlice";
import produce from "immer";
import { unwrapResult } from "@reduxjs/toolkit";

const Course = () => {
  const classes = useStyles();
  const [openedCourseDialog, setOpenedCourseDialog] = useState(false);
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(
    false
  );
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  // Application state
  const courses = useSelector((state) => state.courses.courses);

  // handle "New course" button click
  const handleNewCourseButtonClick = () => {
    setOpenedCourseDialog(true);
  };

  const handleDeleteClick = () => {
    setOpenedConfirmDialog(true);
  };

  // handle submit button click in confirm dialog
  const handleConfirmDialogSubmitButtonClick = () => {
    setOpenedConfirmDialog(false);
  };

  // handle cancel button click in confirm dialog
  const handleConfirmDialogCancelButtonClick = () => {
    setOpenedConfirmDialog(false);
  };

  const [result, setResult] = useState([]);
  const handleSearch = (e) => {
    const text = e.target.value;
    setResult(
      courses.filter((c) => {
        return c.courseName.toLowerCase().includes(String(text));
      })
    );
  };

  useEffect(async () => {
    try {
      const dispatchState = await dispatch(fetchCourse());
      unwrapResult(dispatchState);
      setResult(dispatchState.payload.courses);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={classes.course}>
      <Route path={match.path + "/:courseId"}>
        <CourseDialog
          isOpen={true}
          isEdit={true}
          onCancel={() => {
            history.replace("/courses");
          }}
          onFinish={() => {
            history.replace("/courses");
          }}
        />
      </Route>
      <CourseDialog
        isOpen={openedCourseDialog}
        isEdit={false}
        onCancel={() => {
          setOpenedCourseDialog(false);
        }}
        onFinish={() => {
          setOpenedCourseDialog(false);
        }}
      />
      <ConfirmDialog
        isOpen={openedConfirmDialog}
        onCancel={handleConfirmDialogCancelButtonClick}
        onSubmit={handleConfirmDialogSubmitButtonClick}
        title="Do you want to delete the course?"
      />
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
              placeholder="Enter course ID or course name"
              inputProps={{
                "aria-label": "enter course id or course name",
              }}
            />
          </Paper>
        </Grid>
        <Grid style={{ marginTop: 24 }} item xs={11}>
          <CourseTable
            onDeleteClick={handleDeleteClick}
            onAddCourse={handleNewCourseButtonClick}
            courses={result}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Course;

import React, { useState } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import useStyles from "./Course.styles";
import { Grid, Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CourseTable from "./CourseTable/CourseTable";
import CourseDialog from "./CourseDialog/CourseDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";

const Course = () => {
  const classes = useStyles();
  const [openedCourseDialog, setOpenedCourseDialog] = useState(false);
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  // Application state
  const courses = useSelector((state) => state.courses.courses);

  // handle "New course" button click
  const handleNewCourseButtonClick = () => {
    setOpenedCourseDialog(true);
  };

  // handle submit button click in course dialog
  const handleCourseDialogSubmitButtonClick = () => {
    setOpenedCourseDialog(false);
  };

  // handle cancel button click in course dialog
  const handleCourseDialogCancelButtonClick = () => {
    history.replace("/courses");
    if (openedCourseDialog) {
      setOpenedCourseDialog(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenedConfirmDialog(true);
  };

  const handleEditClick = () => {
    history.replace("/courses/id");
  };

  // handle submit button click in confirm dialog
  const handleConfirmDialogSubmitButtonClick = () => {
    setOpenedConfirmDialog(false);
  };

  // handle cancel button click in confirm dialog
  const handleConfirmDialogCancelButtonClick = () => {
    setOpenedConfirmDialog(false);
  };

  return (
    <div className={classes.course}>
      <Route path={match.path + "/id"}>
        <CourseDialog
          isOpen={true}
          onCancel={handleCourseDialogCancelButtonClick}
          onSubmit={handleCourseDialogSubmitButtonClick}
        />
      </Route>
      <CourseDialog
        isOpen={openedCourseDialog}
        onCancel={handleCourseDialogCancelButtonClick}
        onSubmit={handleCourseDialogSubmitButtonClick}
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
              className={classes.input}
              placeholder="Enter course ID or course name"
              inputProps={{ "aria-label": "enter course id or course name" }}
            />
          </Paper>
        </Grid>
        <Grid style={{ marginTop: 24 }} item xs={11}>
          <CourseTable
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            onAddCourse={handleNewCourseButtonClick}
            courses={courses}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Course;

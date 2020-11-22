import React, { useState } from "react";
import useStyles from "./Course.styles";
import { Grid, Paper, IconButton, InputBase, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import CourseTable from "./CourseTable/CourseTable";
import CourseForm from "./CourseForm/CourseForm";

const Course = () => {
  const classes = useStyles();
  const [courseFormOpened, setCourseFormOpened] = useState(false);

  const [courses] = useState([
    {
      id: 123,
      name: "Intro to programming",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 124,
      name: "Intro to IT",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 125,
      name: "Database System",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 126,
      name: "Database Management System",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 127,
      name: "Programming Technique",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 128,
      name: "Networking Essentials",
      credit: 3,
      createdAt: "11/12/2020 7:00 AM",
    },
  ]);

  const handleAddCourse = () => {
    setCourseFormOpened(true);
  };

  const handleSubmitAddCourse = () => {
    setCourseFormOpened(false);
  };

  const handleCancelAddCourse = () => {
    setCourseFormOpened(false);
  };

  return (
    <div className={classes.course}>
      <CourseForm
        isOpen={courseFormOpened}
        onCancel={handleCancelAddCourse}
        onSubmit={handleSubmitAddCourse}
      />
      <Grid container justify="center">
        <Grid item xs={10}>
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
        <Grid style={{ marginTop: 24 }} item xs={10}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddCourse}
          >
            Add a course
          </Button>
        </Grid>
        <Grid style={{ marginTop: 24 }} item xs={10}>
          <CourseTable courses={courses} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Course;

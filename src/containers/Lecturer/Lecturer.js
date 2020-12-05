import React, { useState } from "react";
import useStyles from "./Lecturer.styles";
import { Grid, Paper, IconButton, InputBase, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import LecturerTable from "./LecturerTable/LecturerTable";
import LecturerForm from "./LecturerForm/LecturerForm";

const Lecturer = () => {
  const classes = useStyles();
  const [lecturerFormOpened, setLecturerFormOpened] = useState(false);

  const [lecturers] = useState([
    {
      id: 123,
      name: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 124,
      name: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 125,
      name: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 126,
      name: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 127,
      name: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 128,
      name: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
  ]);

  const handleAddLecturer = () => {
    setLecturerFormOpened(true);
  };

  const handleSubmitAddLecturer = () => {
    setLecturerFormOpened(false);
  };

  const handleCancelAddLecturer = () => {
    setLecturerFormOpened(false);
  };

  return (
    <div className={classes.lecturer}>
      <LecturerForm
        isOpen={lecturerFormOpened}
        onCancel={handleCancelAddLecturer}
        onSubmit={handleSubmitAddLecturer}
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
            onClick={handleAddLecturer}
          >
            Add a lecturer
          </Button>
        </Grid>
        <Grid style={{ marginTop: 24 }} item xs={10}>
          <LecturerTable lecturers={lecturers} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Lecturer;

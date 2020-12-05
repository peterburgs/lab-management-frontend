import React, { useState } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import useStyles from "./Lecturer.styles";
import { Grid, Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LecturerTable from "./LecturerTable/LecturerTable";
import LecturerDialog from "./LecturerDialog/LecturerDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

const Lecturer = () => {
  const classes = useStyles();
  const [openedLecturerDialog, setOpenedLecturerDialog] = useState(false);
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  const [lecturers] = useState([
    {
      id: 123,
      fullName: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 124,
      fullName: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 125,
      fullName: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 126,
      fullName: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 127,
      fullName: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 128,
      fullName: "Le Vinh Thinh",
      email: "123@gmail.com",
      createdAt: "11/12/2020 7:00 AM",
    },
  ]);

  // handle "New lecturer" button click
  const handleNewLecturerButtonClick = () => {
    setOpenedLecturerDialog(true);
  };

  // handle submit button click in course dialog
  const handleLecturerDialogSubmitButtonClick = () => {
    setOpenedLecturerDialog(false);
  };

  // handle cancel button click in course dialog
  const handleLecturerDialogCancelButtonClick = () => {
    history.replace("/lecturers");
    if (openedLecturerDialog) {
      setOpenedLecturerDialog(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenedConfirmDialog(true);
  };

  const handleEditClick = () => {
    history.replace("/lecturers/id");
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
    <div className={classes.lecturer}>
      <Route path={match.path + "/id"}>
        <LecturerDialog
          isOpen={true}
          onCancel={handleLecturerDialogCancelButtonClick}
          onSubmit={handleLecturerDialogSubmitButtonClick}
        />
      </Route>
      <LecturerDialog
          isOpen={openedLecturerDialog}
          onCancel={handleLecturerDialogCancelButtonClick}
          onSubmit={handleLecturerDialogSubmitButtonClick}
        />
      <ConfirmDialog
        isOpen={openedConfirmDialog}
        onCancel={handleConfirmDialogCancelButtonClick}
        onSubmit={handleConfirmDialogSubmitButtonClick}
        title="Do you want to delete the lecturer?"
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
              placeholder="Enter lecturer ID or name"
              inputProps={{ "aria-label": "enter lecturer ID or name" }}
            />
          </Paper>
        </Grid>
        <Grid style={{ marginTop: 24 }} item xs={11}>
          <LecturerTable
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            onAddCourse={handleNewLecturerButtonClick}
            lecturers={lecturers}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Lecturer;

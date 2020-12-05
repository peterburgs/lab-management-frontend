import React, { useState } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import useStyles from "./Laboratory.styles";
import { Grid, Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LaboratoryTable from "./LaboratoryTable/LaboratoryTable";
import LaboratoryDialog from "./LaboratoryDialog/LaboratoryDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

const Laboratory = () => {
  const classes = useStyles();
  const [openedLaboratoryDialog, setOpenedLaboratoryDialog] = useState(false);
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  const [labs] = useState([
    {
      id: 123,
      name: "A3-101",
      capacity: 30,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 124,
      name: "A3-102",
      capacity: 30,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 125,
      name: "A3-103",
      capacity: 30,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 126,
      name: "A3-104",
      capacity: 30,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 127,
      name: "A3-105",
      capacity: 30,
      createdAt: "11/12/2020 7:00 AM",
    },
    {
      id: 128,
      name: "A3-106",
      capacity: 30,
      createdAt: "11/12/2020 7:00 AM",
    },
  ]);

  // handle "New laboratory" button click
  const handleNewLaboratoryButtonClick = () => {
    setOpenedLaboratoryDialog(true);
  };

  // handle submit button click in Laboratory dialog
  const handleLaboratoryDialogSubmitButtonClick = () => {
    setOpenedLaboratoryDialog(false);
  };

  // handle cancel button click in Laboratory dialog
  const handleLaboratoryDialogCancelButtonClick = () => {
    history.replace("/laboratories");
    if (openedLaboratoryDialog) {
      setOpenedLaboratoryDialog(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenedConfirmDialog(true);
  };

  const handleEditClick = () => {
    history.replace("/laboratories/id");
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
    <div className={classes.lab}>
      <Route path={match.path + "/id"}>
        <LaboratoryDialog
          isOpen={true}
          onCancel={handleLaboratoryDialogCancelButtonClick}
          onSubmit={handleLaboratoryDialogSubmitButtonClick}
        />
      </Route>
      <LaboratoryDialog
        isOpen={openedLaboratoryDialog}
        onCancel={handleLaboratoryDialogCancelButtonClick}
        onSubmit={handleLaboratoryDialogSubmitButtonClick}
      />
      <ConfirmDialog
        isOpen={openedConfirmDialog}
        onCancel={handleConfirmDialogCancelButtonClick}
        onSubmit={handleConfirmDialogSubmitButtonClick}
        title="Do you want to delete the lab?"
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
              placeholder="Enter lab name"
              inputProps={{ "aria-label": "enter lab name" }}
            />
          </Paper>
        </Grid>
        <Grid style={{ marginTop: 24 }} item xs={11}>
          <LaboratoryTable
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
            onAddLab={handleNewLaboratoryButtonClick}
            labs={labs}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Laboratory;

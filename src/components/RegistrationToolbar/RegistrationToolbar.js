import React from "react";
import useStyles from "./RegistrationToolbar.styles";
import { Paper, Button, Typography } from "@material-ui/core";

const RegistrationToolbar = (props) => {
  const classes = useStyles();

  let content = null;

  if (props.openingRegistration) {
    content = (
      <Paper className={classes.paper} style={{ justifyContent: "flex-start" }}>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={props.onCloseRegistration}
        >
          Close registration
        </Button>
        <Typography style={{ marginLeft: "0.5rem" }}>
          auto close after
        </Typography>
        <Typography style={{ marginLeft: "0.2rem", color: "#e7305b" }}>
          {props.remainingTime}
        </Typography>
      </Paper>
    );
  } else {
    content = (
      <Paper className={classes.paper}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.onOpenRegistration}
        >
          Open registration
        </Button>
      </Paper>
    );
  }
  return content;
};

export default RegistrationToolbar;

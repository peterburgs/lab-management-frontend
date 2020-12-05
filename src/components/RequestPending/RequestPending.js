import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import useStyles from "./RequestPending.styles";

const RequestPending = () => {
  const classes = useStyles();

  return (
    <Paper elevation={6} className={classes.requestPending}>
      <Typography>
        A request is pending
      </Typography>
      <Button variant="contained" color="secondary" disableElevation>
        Continue
      </Button>
    </Paper>
  );
};

export default RequestPending;

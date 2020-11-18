import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import useStyles from "./RequestPending.styles";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";

const RequestPending = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.requestPending}>
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

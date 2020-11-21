import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./Lab.styles";
import PropTypes from "prop-types";

const Lab = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.lab} elevation={0}>
      <Typography style={{ fontWeight: 700 }}>{props.name}</Typography>
    </Paper>
  );
};

Lab.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Lab;

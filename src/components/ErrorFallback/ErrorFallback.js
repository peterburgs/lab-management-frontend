/* eslint-disable react/prop-types */
import { Button, Typography } from "@material-ui/core";
import React from "react";
import errorImg from "../../assets/images/error.png";
import useStyles from "./ErrorFallback.styles";

const ErrorFallback = ({ resetErrorBoundary }) => {
  const classes = useStyles();

  return (
    <div className={classes.errorFallback}>
      <img src={errorImg} alt="Error"></img>
      <Typography variant="h2">Something went wrong!</Typography>
      <Button color="secondary" variant="contained" onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

export default ErrorFallback;

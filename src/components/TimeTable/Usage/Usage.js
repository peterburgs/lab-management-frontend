import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./Usage.styles";

const LabUsage = (props) => {
  const classes = useStyles({ index: props.index });

  return (
    <Paper className={classes.usage} elevation={0}>
      <Typography style={{ fontSize: 14 }}>
        {props.courseName}
      </Typography>
      <Typography>{props.lecturerName}</Typography>
      <Typography>{props.startPeriod} - {props.endPeriod}</Typography>
    </Paper>
  );
};

export default LabUsage;

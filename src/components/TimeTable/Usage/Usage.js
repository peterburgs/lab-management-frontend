import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./Usage.styles";
import EditIcon from '@material-ui/icons/Edit';

const LabUsage = (props) => {
  const classes = useStyles({ index: props.index });

  return (
    <Paper className={classes.usage} elevation={0}>
      
      <Typography style={{fontSize: 13}}>
        {props.courseName}
      </Typography>
      <Typography style={{fontSize: 12}}>{props.lecturerName}</Typography>
      <Typography style={{fontSize: 12}}>Period: {props.startPeriod} - {props.endPeriod}</Typography>
    </Paper>
  );
};

export default LabUsage;

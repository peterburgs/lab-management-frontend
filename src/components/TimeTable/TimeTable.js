import { Paper, IconButton } from "@material-ui/core";
import React from "react";
import TimeTableContent from "./TimeTableContent/TimeTableContent";
import TimeTableHeader from "./TimeTableHeader/TimeTableHeader";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";

import useStyles from "./TimeTable.styles";

const TimeTable = (props) => {
  const classes = useStyles();

  console.log(props.displayedLabUsages);

  return (
    <Paper className={classes.timeTable}>
      <div className={classes.navigation}>
        <IconButton disabled={!props.isPrev} onClick={props.onPrev}>
          <NavigateBefore />
        </IconButton>
        <IconButton disabled={!props.isNext} onClick={props.onNext}>
          <NavigateNext />
        </IconButton>
      </div>
      <TimeTableHeader displayedDays={props.displayedDays} />
      <TimeTableContent displayedLabUsages={props.displayedLabUsages} />
    </Paper>
  );
};

export default TimeTable;

import { Paper, IconButton } from "@material-ui/core";
import React from "react";
import TimeTableContent from "./TimeTableContent/TimeTableContent";
import TimeTableHeader from "./TimeTableHeader/TimeTableHeader";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";
import PropTypes from "prop-types";

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
      <TimeTableContent
        displayedLabs={props.displayedLabs}
        displayedLabUsages={props.displayedLabUsages}
      />
    </Paper>
  );
};

TimeTable.propTypes = {
  displayedLabUsages: PropTypes.array.isRequired,
  displayedDays: PropTypes.array.isRequired,
  displayedLabs: PropTypes.array.isRequired,
  isPrev: PropTypes.bool.isRequired,
  onPrev: PropTypes.func.isRequired,
  isNext: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default TimeTable;

import { Grid, Paper, Typography, Hidden } from "@material-ui/core";
import React from "react";
import useStyles from "./TimeTableHeader.styles";
import PropTypes from "prop-types";

const TimeTableHeader = (props) => {
  const classes = useStyles();

  const convertToDayString = (dayInt) => {
    switch (dayInt) {
      case 0:
        return "Monday";
      case 1:
        return "Tuesday";
      case 2:
        return "Wednesday";
      case 3:
        return "Thursday";
      case 4:
        return "Friday";
      case 5:
        return "Saturday";
      default:
        return "";
    }
  };

  return (
    <Paper className={classes.header}>
      <div className={classes.labNameColumn}>
        <Typography className={classes.title}>Lab</Typography>
      </div>
      <Grid wrap="nowrap" container spacing={0}>
        <Grid item xs={12} md={6} lg={3}>
          <Typography className={classes.title}>
            {props.displayedDays
              ? convertToDayString(props.displayedDays[0])
              : null}
          </Typography>
        </Grid>
        <Hidden smDown implementation="js">
          <Grid item md={6} lg={3}>
            <Typography className={classes.title}>
              {props.displayedDays
                ? convertToDayString(props.displayedDays[1])
                : null}
            </Typography>
          </Grid>
        </Hidden>
        <Hidden mdDown implementation="js">
          <Grid item lg={3}>
            <Typography className={classes.title}>
              {props.displayedDays
                ? convertToDayString(props.displayedDays[2])
                : null}
            </Typography>
          </Grid>
          <Grid item lg={3}>
            <Typography className={classes.title}>
              {props.displayedDays
                ? convertToDayString(props.displayedDays[3])
                : null}
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  );
};

TimeTableHeader.propTypes = {
  displayedDays: PropTypes.array.isRequired,
};

export default TimeTableHeader;

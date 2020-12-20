import React from "react";
import { Typography, IconButton, Grid, Button } from "@material-ui/core";
import useStyles from "./Semester.styles";
import EditIcon from "@material-ui/icons/Edit";

const Semester = (props) => {
  const classes = useStyles();

  let content = null;

  if (props.semester) {
    content = (
      <React.Fragment>
        <div className={classes.semester}>
          <Typography
            display="inline"
            style={{ color: "white", fontSize: 20, fontWeight: 700 }}
          >
            {props.semester.semesterName}
          </Typography>
          <IconButton onClick={props.onEdit}>
            <EditIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <Typography
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Start date: {new Date(props.semester.startDate).toLocaleString()}
        </Typography>
        <Typography
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Number of weeks: {props.semester.numberOfWeeks}
        </Typography>
      </React.Fragment>
    );
  } else {
    content = (
      <Grid container justify="center">
        <Grid
          item
          xs={10}
          style={{ display: "flex", justifyContent: "center", padding: "5rem" }}
        >
          <Button
            style={{ borderRadius: 8, fontSize: 16, textTransform: "none" }}
            onClick={props.onStart}
            variant="contained"
            color="secondary"
          >
            Start a semester
          </Button>
        </Grid>
      </Grid>
    );
  }

  return content;
};

export default Semester;

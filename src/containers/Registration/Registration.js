import { Grid, IconButton, Typography, Paper, Button } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Registration.styles";
import EditIcon from "@material-ui/icons/Edit";
import RegistrationTable from "./RegistrationTable/RegistrationTable";

const Registration = () => {
  const classes = useStyles();

  const [teachings] = useState([
    {
      lecturerId: 123,
      fullName: "Le Vinh Thinh A",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 124,
      fullName: "Le Vinh Thinh B",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 125,
      fullName: "Le Vinh Thinh C",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 126,
      fullName: "Le Vinh Thinh D",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 132,
      fullName: "Le Vinh Thinh E",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 127,
      fullName: "Le Vinh Thinh F",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 128,
      fullName: "Le Vinh Thinh G",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 129,
      fullName: "Le Vinh Thinh H",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 130,
      fullName: "Le Vinh Thinh I",
      courseName: "New technology",
      group: 1,
    },
    {
      lecturerId: 131,
      fullName: "Le Vinh Thinh J",
      courseName: "New technology",
      group: 1,
    },
  ]);

  return (
    <div className={classes.registration}>
      <div className={classes.background}></div>
      <Grid container justify="center">
        <Grid className={classes.overlayItem} item xs={10}>
          <div className={classes.semester}>
            <Typography
              display="inline"
              style={{ color: "white", fontSize: 20, fontWeight: 700 }}
            >
              Semester
            </Typography>
            <IconButton>
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
            Start date: 19/11/2020
          </Typography>
          <Typography
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            The number of week: 15
          </Typography>
        </Grid>
        <Grid className={classes.overlayItem} item xs={10}>
          <Paper className={classes.paper}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Open registration
            </Button>
          </Paper>
        </Grid>
        <Grid className={classes.overlayItem} item xs={10}>
          <RegistrationTable teachings={teachings} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration;

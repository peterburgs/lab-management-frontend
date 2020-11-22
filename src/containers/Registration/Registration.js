import { Grid, IconButton, Typography, Paper, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./Registration.styles";
import EditIcon from "@material-ui/icons/Edit";
import RegistrationTable from "./RegistrationTable/RegistrationTable";
import produce from "immer";
import RegistrationDialog from "./RegistrationDialog/RegistrationDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

const Registration = () => {
  const classes = useStyles();
  const [semester] = useState({
    startDate: "11/11/2020",
    numberOfWeek: 15,
  });
  const [latestRegistration, setLatestRegistration] = useState({
    patch: 1,
    startDate: "2020-11-10T07:00:00.000+07:00",
    endDate: "2020-11-22T07:00:00.000+07:00",
    status: "open",
  });
  const [remainingTime, setRemainingTime] = useState("");

  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isOpenRegistrationDialog, setIsOpenRegistrationDialog] = useState(
    false
  );

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

  const secondsToDhms = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d == 1 ? " d " : " d ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hr ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  };

  useEffect(() => {
    setInterval(() => {
      const seconds =
        (Date.parse(latestRegistration.endDate) - new Date()) / 1000;
      setRemainingTime(secondsToDhms(seconds));
    }, 1000);
  }, []);

  const renderSemester = (semester) => {
    return semester ? (
      <React.Fragment>
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
          Start date: {semester.startDate}
        </Typography>
        <Typography
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          The number of week: {semester.numberOfWeek}
        </Typography>
      </React.Fragment>
    ) : (
      <Button variant="contained" color="secondary">
        Start a semester
      </Button>
    );
  };

  const handleCloseRegistration = () => {
    setIsOpenConfirmDialog(true);
  };

  const handleSubmitCloseRegistration = () => {
    setLatestRegistration(
      produce((draft) => {
        draft.status = "close";
      })
    );
    setIsOpenConfirmDialog(false);
  };

  const handleCancelCloseRegistration = () => {
    setIsOpenConfirmDialog(false);
  };

  const handleOpenRegistration = () => {
    setIsOpenRegistrationDialog(true);
  };

  const handleSubmitOpenRegistration = () => {
    setIsOpenRegistrationDialog(false);
  };

  const handleCancelOpenRegistration = () => {
    setIsOpenRegistrationDialog(false);
  };

  const renderRegistrationToolbar = (latestRegistration) => {
    return latestRegistration ? (
      latestRegistration.status === "open" ? (
        <Paper
          className={classes.paper}
          style={{ justifyContent: "flex-start" }}
        >
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleCloseRegistration}
          >
            Close registration
          </Button>
          <Typography style={{ marginLeft: "0.5rem" }}>
            auto close after
          </Typography>
          <Typography style={{ marginLeft: "0.2rem", color: "#e7305b" }}>
            {remainingTime}
          </Typography>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleOpenRegistration}
          >
            Open registration
          </Button>
        </Paper>
      )
    ) : (
      <Paper className={classes.paper}>
        <Button className={classes.button} variant="contained" color="primary">
          Open registration
        </Button>
      </Paper>
    );
  };

  return (
    <div className={classes.registration}>
      <RegistrationDialog
        isOpen={isOpenRegistrationDialog}
        onCancel={handleCancelOpenRegistration}
        onSubmit={handleSubmitOpenRegistration}
      />
      <ConfirmDialog
        isOpen={isOpenConfirmDialog}
        onCancel={handleCancelCloseRegistration}
        onSubmit={handleSubmitCloseRegistration}
      />
      <div className={classes.background}></div>
      <Grid container justify="center">
        <Grid className={classes.overlayItem} item xs={10}>
          {renderSemester(semester)}
        </Grid>
        <Grid className={classes.overlayItem} item xs={10}>
          {renderRegistrationToolbar(latestRegistration)}
        </Grid>
        <Grid className={classes.overlayItem} item xs={10}>
          <RegistrationTable teachings={teachings} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration;

import { Grid, IconButton, Typography, Paper, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./Registration.styles";
import EditIcon from "@material-ui/icons/Edit";
import RegistrationTable from "./RegistrationTable/RegistrationTable";
import produce from "immer";
import RegistrationDialog from "./RegistrationDialog/RegistrationDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import SemesterDialog from "./SemesterDialog/SemesterDialog";

// Registration page
const Registration = () => {
  const classes = useStyles();

  // Application states
  // will be stored to Redux later
  const [semester, setSemester] = useState(null);
  const [latestRegistration, setLatestRegistration] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [teachings] = useState([
    {
      id: 1,
      lecturerId: 123,
      lecturerName: "Le Vinh Thinh A",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 2,
      lecturerId: 124,
      lecturerName: "Le Vinh Thinh B",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 3,
      lecturerId: 125,
      lecturerName: "Le Vinh Thinh C",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 4,
      lecturerId: 126,
      lecturerName: "Le Vinh Thinh D",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 5,
      lecturerId: 132,
      lecturerName: "Le Vinh Thinh E",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 6,
      lecturerId: 127,
      lecturerName: "Le Vinh Thinh F",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 7,
      lecturerId: 128,
      lecturerName: "Le Vinh Thinh G",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 8,
      lecturerId: 129,
      lecturerName: "Le Vinh Thinh H",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 9,
      lecturerId: 130,
      lecturerName: "Le Vinh Thinh I",
      courseName: "New technology",
      group: 1,
    },
    {
      id: 10,
      lecturerId: 131,
      lecturerName: "Le Vinh Thinh J",
      courseName: "New technology",
      group: 1,
    },
  ]);

  // Modal state
  const [openedConfirmDialog, setOpenedConfirmDialog] = useState(false);
  const [openedRegistrationDialog, setOpenedRegistrationDialog] = useState(
    false
  );
  const [openedSemesterDialog, setOpenedSemesterDialog] = useState(false);
  const [isEditSemester, setIsEditSemester] = useState(false);

  // convert seconds to days hours minutes seconds
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
    const interval = () => {
      const seconds =
        (Date.parse(latestRegistration.endDate) - new Date()) / 1000;
      setRemainingTime(secondsToDhms(seconds));
    };

    if (latestRegistration) {
      setInterval(interval, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [latestRegistration]);

  // handle "Close registration" button click
  const handleCloseRegistrationButtonClick = () => {
    setOpenedConfirmDialog(true);
  };

  // handle submit button click in confirm dialog
  const handleConfirmDialogSubmitButtonClick = () => {
    setLatestRegistration(
      produce((draft) => {
        draft.status = "close";
      })
    );
    setOpenedConfirmDialog(false);
  };

  // handle cancel button click in confirm dialog
  const handleConfirmDialogCancelButtonClick = () => {
    setOpenedConfirmDialog(false);
  };

  // handle "Open registration" button click
  const handleOpenRegistrationButtonClick = () => {
    setOpenedRegistrationDialog(true);
  };

  // handle submit button click in registration dialog
  const handleRegistrationDialogSubmitButtonClick = () => {
    setLatestRegistration({
      patch: 1,
      startDate: "2020-11-10T07:00:00.000+07:00",
      endDate: "2020-11-24T07:00:00.000+07:00",
      status: "open",
    });
    setOpenedRegistrationDialog(false);
  };

  // handle cancel button click in registration dialog
  const handleRegistrationDialogCancelButtonClick = () => {
    setOpenedRegistrationDialog(false);
  };

  // handle "Start semester" button click
  const handleStartSemesterButtonClick = () => {
    setOpenedSemesterDialog(true);
    setIsEditSemester(false);
  };

  // handle submit button click in semester dialog
  const handleSemesterDialogSubmitButtonClick = () => {
    setSemester({ startDate: "11/11/2020", numberOfWeek: 15 });

    setOpenedSemesterDialog(false);
  };

  // handle cancel button click in semester dialog
  const handleSemesterDialogCancelButtonClick = () => {
    setOpenedSemesterDialog(false);
  };

  const handleEditSemesterButtonClick = () => {
    setOpenedSemesterDialog(true);
    setIsEditSemester(true);
  };

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
          <IconButton onClick={handleEditSemesterButtonClick}>
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
          Number of weeks: {semester.numberOfWeek}
        </Typography>
      </React.Fragment>
    ) : (
      <Grid container justify="center">
        <Grid
          item
          xs={10}
          style={{ display: "flex", justifyContent: "center", padding: "5rem" }}
        >
          <Button
            style={{ borderRadius: 8, fontSize: 16, textTransform: "none" }}
            onClick={handleStartSemesterButtonClick}
            variant="contained"
            color="secondary"
          >
            Start a semester
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderRegistrationToolbar = (latestRegistration) => {
    return semester ? (
      latestRegistration ? (
        latestRegistration.status === "open" ? (
          <Paper
            className={classes.paper}
            style={{ justifyContent: "flex-start" }}
          >
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleCloseRegistrationButtonClick}
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
              onClick={handleOpenRegistrationButtonClick}
            >
              Open registration
            </Button>
          </Paper>
        )
      ) : (
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleOpenRegistrationButtonClick}
          >
            Open registration
          </Button>
        </Paper>
      )
    ) : null;
  };

  return (
    <React.Fragment>
      <RegistrationDialog
        isOpen={openedRegistrationDialog}
        onCancel={handleRegistrationDialogCancelButtonClick}
        onSubmit={handleRegistrationDialogSubmitButtonClick}
      />
      <SemesterDialog
        isEdit={isEditSemester}
        isOpen={openedSemesterDialog}
        onCancel={handleSemesterDialogCancelButtonClick}
        onSubmit={handleSemesterDialogSubmitButtonClick}
      />
      <ConfirmDialog
        isOpen={openedConfirmDialog}
        onCancel={handleConfirmDialogCancelButtonClick}
        onSubmit={handleConfirmDialogSubmitButtonClick}
        title="Do you want to close this registration"
      />
      <div className={classes.background}></div>
      <Grid container justify="center">
        <Grid style={{marginTop: 24}} item xs={11}>
          {renderSemester(semester)}
        </Grid>
        <Grid style={{marginTop: 24}} item xs={11}>
          {renderRegistrationToolbar(latestRegistration)}
        </Grid>
        <Grid style={{marginTop: 24}} item xs={11}>
          {latestRegistration ? (
            <RegistrationTable teachings={teachings} />
          ) : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Registration;

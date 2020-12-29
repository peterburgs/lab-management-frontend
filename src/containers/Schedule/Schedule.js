import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";
import useStyles from "./Schedule.styles";
import AddIcon from "@material-ui/icons/Add";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import TimeTable from "./TimeTable/TimeTable";
import LabUsageDialog from "./LabUsageDialog/LabUsageDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchLab, fetchLabRefreshed } from "../Lab/LabSlice";
import {
  fetchSemester,
  fetchSemesterRefreshed,
} from "../Registration/RegistrationSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const useFetchLab = () => {
  const dispatch = useDispatch();

  const fetchLabStatus = useSelector(
    (state) => state.labs.fetchLabStatus
  );
  const fetchLabError = useSelector(
    (state) => state.labs.fetchLabError
  );

  useEffect(() => {
    if (fetchLabStatus === "idle") {
      (async () => {
        try {
          const fetchLabResult = await dispatch(fetchLab());
          unwrapResult(fetchLabResult);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (
        fetchLabStatus === "failed" ||
        fetchLabStatus === "succeeded"
      ) {
        dispatch(fetchLabRefreshed());
      }
    };
  }, [dispatch, fetchLabStatus]);

  return [fetchLabStatus, fetchLabError];
};
//
const useFetchSemester = () => {
  const dispatch = useDispatch();
  const fetchSemesterStatus = useSelector(
    (state) => state.registration.fetchSemesterStatus
  );
  const fetchSemesterError = useSelector(
    (state) => state.registration.fetchSemesterError
  );

  useEffect(() => {
    if (fetchSemesterStatus === "idle") {
      (async () => {
        try {
          const res = await dispatch(fetchSemester());
          unwrapResult(res);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (
        fetchSemesterStatus === "failed" ||
        fetchSemesterStatus === "succeeded"
      ) {
        dispatch(fetchSemesterRefreshed());
      }
    };
  }, [dispatch, fetchSemesterStatus]);

  return [fetchSemesterStatus, fetchSemesterError];
};
//
const Schedule = () => {
  const classes = useStyles();
  const [openedLabUsageDialog, setOpenedLabUsageDialog] = useState(
    false
  );

  const [fetchLabStatus, fetchLabError] = useFetchLab();
  const [
    fetchSemesterStatus,
    fetchSemesterError,
  ] = useFetchSemester();

  const labs = useSelector((state) => state.labs.labs);
  const userRole = useSelector((state) => state.auth.userRole);

  const semester = useSelector(
    (state) => state.registration.semester
  );

  const [labUsages, setLabUsages] = useState([]);

  useEffect(() => {
    const _labUsages = [];
    if (semester) {
      for (let reg of semester.registrations) {
        for (let teaching of reg.teachings) {
          for (let labUsage of teaching.labUsages) {
            _labUsages.push(labUsage);
          }
        }
      }
      console.log(_labUsages);
      setLabUsages(_labUsages);
    }
  }, [semester]);

  const handleAddLabUsageButtonClick = () => {
    setOpenedLabUsageDialog(true);
  };

  const handleLabUsageDialogSubmitButtonClick = () => {
    setOpenedLabUsageDialog(false);
  };

  const handleLabUsageDialogCancelButtonClick = () => {
    setOpenedLabUsageDialog(false);
  };

  return (
    <div className={classes.schedule}>
      <LabUsageDialog
        isOpen={openedLabUsageDialog}
        onCancel={handleLabUsageDialogCancelButtonClick}
        onSubmit={handleLabUsageDialogSubmitButtonClick}
      />
      <Grid justify="center" container spacing={0}>
        <Grid item container xs={11}>
          <Grid
            className={classes.toolbarLeft}
            spacing={1}
            item
            container
            lg={7}
          >
            <Grid item xs={12} sm={"auto"}>
              {userRole === "LECTURER" ? (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  startIcon={<EmojiPeopleIcon />}
                  onClick={handleAddLabUsageButtonClick}
                >
                  Raise Request
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddLabUsageButtonClick}
                >
                  Add extra class
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={"auto"}>
              <Button
                className={classes.button}
                variant="contained"
                style={{ backgroundColor: "#388E3C", color: "#fff" }}
                startIcon={<ImportExportIcon />}
              >
                Export lab usage
              </Button>
            </Grid>
            <Grid item xs={12} sm={"auto"}>
              <Button
                className={classes.button}
                variant="contained"
                style={{ backgroundColor: "#388E3C", color: "#fff" }}
                startIcon={<ImportExportIcon />}
              >
                Export theory room usage
              </Button>
            </Grid>
          </Grid>
          <Grid className={classes.toolbarRight} item lg={5}>
            {/* <FormControl>
              <InputLabel
                style={{ color: "white" }}
                id="demo-simple-select-outlined-label"
              >
                Week
              </InputLabel>
              <Select
                style={{ color: "white" }}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                label="Week"
              >
                {semester
                  ? [...Array(semester.numberOfWeeks)].map((e, i) => (
                      <MenuItem key={"abc" + i} value={i}>
                        {i}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl> */}
            {/* <Typography style={{ color: "white" }}>From</Typography>
            <Typography style={{ color: "white" }}>
              Oct 1st, 2020
            </Typography>
            <Typography style={{ color: "white" }}>to</Typography>
            <Typography style={{ color: "white" }}>
              Oct 2nd, 2020
            </Typography> */}
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <TimeTable labs={labs} labUsages={labUsages} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Schedule;

import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Grid,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useRef, useEffect, useState } from "react";
import useStyles from "./TimeTable.styles";
import Lab from "../../../components/Lab/Lab";
import Usage from "../../../components/Usage/Usage";
import PropTypes from "prop-types";
import _ from "lodash";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { useSelector } from "react-redux";

const TimeTable = (props) => {
  const classes = useStyles();
  const [week, setWeek] = useState(0);
  const semester = useSelector(
    (state) => state.registration.semester
  );

  const labHeadCells = [
    {
      id: "labName",
      label: "Lab",
    },
  ];

  const dayHeadCells = [
    {
      id: "monday",
      label: "Monday",
    },
    {
      id: "tuesday",
      label: "Tuesday",
    },
    {
      id: "wednesday",
      label: "Wednesday",
    },
    {
      id: "thursday",
      label: "Thursday",
    },
    {
      id: "friday",
      label: "Friday",
    },
    {
      id: "saturday",
      label: "Saturday",
    },
  ];

  const convertPeriodToShift = (startPeriod, endPeriod) => {
    if (startPeriod >= 1 && endPeriod <= 5) {
      return 1;
    }
    if (startPeriod >= 6 && endPeriod <= 12) {
      return 2;
    }
    if (startPeriod >= 13 && endPeriod <= 15) {
      return 3;
    }
  };

  const renderLabs = (labs) => {
    labs = _.cloneDeep(labs).sort(function (a, b) {
      if (a.capacity < b.capacity) return 1;
      if (a.capacity > b.capacity) return -1;
      return 0;
    });
    console.log(labs);
    return labs.map((lab) => (
      <TableRow key={lab._id}>
        <TableCell className={classes.labCell} size="small">
          <Lab name={lab.labName} />
        </TableCell>
      </TableRow>
    ));
  };

  const findLabUsage = (
    labUsages,
    dayOfWeek,
    labName,
    shift,
    week
  ) => {
    return labUsages.find(
      (labUsage) =>
        labUsage.lab.labName === labName &&
        labUsage.teaching.dayOfWeek === dayOfWeek &&
        labUsage.weekNo === week &&
        convertPeriodToShift(
          labUsage.startPeriod,
          labUsage.endPeriod
        ) === shift
    );
  };

  const renderLabUsages = (labUsages, labs, week) => {
    labs = _.cloneDeep(labs).sort(function (a, b) {
      if (a.capacity < b.capacity) return 1;
      if (a.capacity > b.capacity) return -1;
      return 0;
    });
    return labs.map((lab) => {
      return (
        <TableRow key={lab._id}>
          {[...Array(6)].map((_, index) => {
            return (
              <TableCell
                align={"center"}
                className={classes.dayCell}
                size="small"
                padding={"default"}
                key={lab._id + index}
                // Important code
                style={{ minWidth: 420 }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    {findLabUsage(
                      labUsages,
                      index,
                      lab.labName,
                      1,
                      week
                    ) ? (
                      <Usage
                        disableActions={userRole === "LECTURER"}
                        courseName={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            1,
                            week
                          ).teaching.course.courseName
                        }
                        lecturerName={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            1,
                            week
                          ).teaching.user.fullName
                        }
                        startPeriod={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            1,
                            week
                          ).startPeriod
                        }
                        endPeriod={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            1,
                            week
                          ).endPeriod
                        }
                        index={1}
                      />
                    ) : (
                      <div
                        style={{ minWidth: 132, minHeight: 140 }}
                      ></div>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {findLabUsage(
                      labUsages,
                      index,
                      lab.labName,
                      2,
                      week
                    ) ? (
                      <Usage
                        disableActions={userRole === "LECTURER"}
                        courseName={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            2,
                            week
                          ).teaching.course.courseName
                        }
                        lecturerName={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            2,
                            week
                          ).teaching.user.fullName
                        }
                        startPeriod={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            2,
                            week
                          ).startPeriod
                        }
                        endPeriod={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            2,
                            week
                          ).endPeriod
                        }
                        index={2}
                      />
                    ) : (
                      <div
                        style={{ minWidth: 132, minHeight: 140 }}
                      ></div>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {findLabUsage(
                      labUsages,
                      index,
                      lab.labName,
                      3,
                      week
                    ) ? (
                      <Usage
                        disableActions={userRole === "LECTURER"}
                        courseName={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            3,
                            week
                          ).teaching.course.courseName
                        }
                        lecturerName={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            3,
                            week
                          ).teaching.user.fullName
                        }
                        startPeriod={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            3,
                            week
                          ).startPeriod
                        }
                        endPeriod={
                          findLabUsage(
                            labUsages,
                            index,
                            lab.labName,
                            3,
                            week
                          ).endPeriod
                        }
                        index={3}
                      />
                    ) : (
                      <div
                        style={{ minWidth: 132, minHeight: 140 }}
                      ></div>
                    )}
                  </Grid>
                </Grid>
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  const labTableRef = useRef();
  const scrollableNodeRef = useRef();

  const handleOnScroll = (e) => {
    labTableRef.current.scrollTop = e.target.scrollTop;
  };

  const userRole = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    scrollableNodeRef.current.addEventListener(
      "scroll",
      handleOnScroll
    );
  }, []);

  return (
    <Paper className={classes.timeTable}>
      <Toolbar className={classes.toolBar}>
        <Typography component="div">Week</Typography>

        <FormControl style={{ marginLeft: 15, marginRight: 15 }}>
          {/* <InputLabel
            style={{ color: "#0a043c" }}
            id="demo-simple-select-outlined-label"
          >
            Week
          </InputLabel> */}
          <Select
            style={{ color: "#0a043c" }}
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
        </FormControl>
        <Typography style={{ color: "#0a043c" }}>
          From&nbsp;
        </Typography>
        <Typography style={{ color: "#ef4f4f" }}>
          Oct 1st, 2020
        </Typography>
        <Typography style={{ color: "#0a043c" }}>
          &nbsp;to&nbsp;
        </Typography>
        <Typography style={{ color: "#ef4f4f" }}>
          Oct 2nd, 2020
        </Typography>
      </Toolbar>
      <Paper className={classes.paper}>
        <TableContainer
          style={{
            width: 100,
            maxHeight: "70vh",
            overflowY: "hidden",
          }}
          ref={labTableRef}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {labHeadCells.map((headCell) => (
                  <TableCell
                    style={{ color: "#393e46", fontWeight: "bold" }}
                    size="small"
                    key={headCell.id}
                    align={"center"}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderLabs(props.labs)}</TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <SimpleBar
            scrollableNodeProps={{ ref: scrollableNodeRef }}
            style={{ maxHeight: "70vh" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {dayHeadCells.map((headCell) => (
                    <TableCell
                      size="small"
                      key={headCell.id}
                      align={"center"}
                      style={{
                        borderLeft: "1px solid rgba(0,0,0,0.1)",
                        zIndex: 1100,
                        color: "#393e46",
                        fontWeight: "bold",
                      }}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {renderLabUsages(props.labUsages, props.labs, week)}
              </TableBody>
            </Table>
          </SimpleBar>
        </TableContainer>
      </Paper>
    </Paper>
  );
};

TimeTable.propTypes = {
  labs: PropTypes.array.isRequired,
  labUsages: PropTypes.array.isRequired,
};

export default TimeTable;

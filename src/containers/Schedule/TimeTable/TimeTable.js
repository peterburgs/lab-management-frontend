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
} from "@material-ui/core";
import React, { useRef, useEffect } from "react";
import useStyles from "./TimeTable.styles";
import Lab from "../../../components/Lab/Lab";
import Usage from "../../../components/Usage/Usage";
import PropTypes from "prop-types";
import _ from "lodash";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const TimeTable = (props) => {
  const classes = useStyles();

  const labHeadCells = [
    {
      id: "lab",
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
    labs = _.cloneDeep(labs).sort();

    return labs.map((lab) => (
      <TableRow key={lab.id}>
        <TableCell className={classes.labCell} size="small">
          <Lab name={lab.name} />
        </TableCell>
      </TableRow>
    ));
  };

  const findLabUsage = (labUsages, dayOfWeek, labName, shift) => {
    return labUsages.find(
      (labUsage) =>
        labUsage.lab === labName &&
        labUsage.dayOfWeek === dayOfWeek &&
        convertPeriodToShift(labUsage.startPeriod, labUsage.endPeriod) === shift
    );
  };

  const renderLabUsages = (labUsages, labs) => {
    labs = _.cloneDeep(labs).sort();
    return labs.map((lab) => {
      return (
        <TableRow key={lab.id}>
          {[...Array(6)].map((_, index) => {
            return (
              <TableCell
                align={"center"}
                className={classes.dayCell}
                size="small"
                padding={"default"}
                key={lab.id + index}
                // Important code
                style={{ minWidth: 420 }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    {findLabUsage(labUsages, index, lab.name, 1) ? (
                      <Usage
                        courseName={
                          findLabUsage(labUsages, index, lab.name, 1).courseName
                        }
                        lecturerName={
                          findLabUsage(labUsages, index, lab.name, 1)
                            .lecturerName
                        }
                        startPeriod={
                          findLabUsage(labUsages, index, lab.name, 1)
                            .startPeriod
                        }
                        endPeriod={
                          findLabUsage(labUsages, index, lab.name, 1).endPeriod
                        }
                        index={1}
                      />
                    ) : (
                      <div style={{ minWidth: 132, minHeight: 140 }}></div>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {findLabUsage(labUsages, index, lab.name, 2) ? (
                      <Usage
                        courseName={
                          findLabUsage(labUsages, index, lab.name, 2).courseName
                        }
                        lecturerName={
                          findLabUsage(labUsages, index, lab.name, 2)
                            .lecturerName
                        }
                        startPeriod={
                          findLabUsage(labUsages, index, lab.name, 2)
                            .startPeriod
                        }
                        endPeriod={
                          findLabUsage(labUsages, index, lab.name, 2).endPeriod
                        }
                        index={2}
                      />
                    ) : (
                      <div style={{ minWidth: 132, minHeight: 140 }}></div>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {findLabUsage(labUsages, index, lab.name, 3) ? (
                      <Usage
                        courseName={
                          findLabUsage(labUsages, index, lab.name, 3).courseName
                        }
                        lecturerName={
                          findLabUsage(labUsages, index, lab.name, 3)
                            .lecturerName
                        }
                        startPeriod={
                          findLabUsage(labUsages, index, lab.name, 3)
                            .startPeriod
                        }
                        endPeriod={
                          findLabUsage(labUsages, index, lab.name, 3).endPeriod
                        }
                        index={3}
                      />
                    ) : (
                      <div style={{ minWidth: 132, minHeight: 140 }}></div>
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

  useEffect(() => {
    scrollableNodeRef.current.addEventListener("scroll", handleOnScroll);
  }, []);

  return (
    <Paper className={classes.timeTable}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" component="div">
          Schedule
        </Typography>
      </Toolbar>
      <Paper className={classes.paper}>
        <TableContainer
          style={{ width: 100, maxHeight: 520, overflowY: "hidden" }}
          ref={labTableRef}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {labHeadCells.map((headCell) => (
                  <TableCell size="small" key={headCell.id} align={"center"}>
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
            style={{ maxHeight: 520 }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {dayHeadCells.map((headCell) => (
                    <TableCell
                      size="small"
                      key={headCell.id}
                      align={"center"}
                      style={{ borderLeft: "1px solid rgba(0,0,0,0.1)", zIndex: 1100 }}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {renderLabUsages(props.labUsages, props.labs)}
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

import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Grid,
} from "@material-ui/core";
import React, { useRef } from "react";
import useStyles from "./TimeTable.styles";
import Lab from "../../../components/Lab/Lab";
import EnhancedToolbar from "../../../components/EnhancedTableToolbar/EnhancedTableToolbar";
import Usage from "../../../components/Usage/Usage";
import PropTypes from "prop-types";
import _ from "lodash";

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
    console.log(labUsages);
    return labs.map((lab) => {
      return (
        <TableRow key={lab.id}>
          {[...Array(6)].map((_, index) => {
            console.log(index);
            return (
              <TableCell
                align={"center"}
                className={classes.dayCell}
                size="small"
                padding={"default"}
                key={lab.id + index}
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

  const dayTableRef = useRef();
  const labTableRef = useRef();

  const handleOnScroll = () => {
    labTableRef.current.scrollTop = dayTableRef.current.scrollTop;
  };

  return (
    <Paper className={classes.timeTable}>
      <EnhancedToolbar title={"Schedule"} />
      <Paper
        style={{ maxHeight: 540, position: "relative" }}
        className={classes.paper}
      >
        <TableContainer ref={labTableRef} className={classes.labTable}>
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

        <TableContainer
          ref={dayTableRef}
          onScroll={handleOnScroll}
          component="div"
        >
          <Table stickyHeader className={classes.dayTable}>
            <TableHead>
              <TableRow>
                {dayHeadCells.map((headCell) => (
                  <TableCell
                    size="small"
                    key={headCell.id}
                    align={"center"}
                    style={{ borderLeft: "1px solid rgba(0,0,0,0.1)" }}
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

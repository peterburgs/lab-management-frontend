import { Grid, Paper, Hidden } from "@material-ui/core";
import React from "react";
import Lab from "../Lab/Lab";
import useStyles from "./TimeTableContent.styles";
import Usage from "../Usage/Usage";
import _ from "lodash";
import produce from "immer";
import PropTypes from "prop-types";

const TimeTableContent = (props) => {
  const classes = useStyles();

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

  const transformedSections = props.displayedLabUsages.map((section) => {
    const transformedSection = section.reduce((labUsages, currentLabUsage) => {
      const labUsageIndex = labUsages
        .map((e) => e.lab)
        .indexOf(currentLabUsage.lab);
      if (labUsageIndex === -1) {
        labUsages = produce(labUsages, (draft) => {
          draft.push({
            lab: currentLabUsage.lab,
            usages: [
              {
                id: currentLabUsage.id,
                courseName: currentLabUsage.courseName,
                lecturerName: currentLabUsage.lecturerName,
                startPeriod: currentLabUsage.startPeriod,
                endPeriod: currentLabUsage.endPeriod,
                shift: convertPeriodToShift(
                  currentLabUsage.startPeriod,
                  currentLabUsage.endPeriod
                ),
              },
            ],
          });
        });
        return labUsages;
      } else {
        labUsages = produce(labUsages, (draft) => {
          draft[labUsageIndex].usages.push({
            id: currentLabUsage.id,
            courseName: currentLabUsage.courseName,
            lecturerName: currentLabUsage.lecturerName,
            startPeriod: currentLabUsage.startPeriod,
            endPeriod: currentLabUsage.endPeriod,
            shift: convertPeriodToShift(
              currentLabUsage.startPeriod,
              currentLabUsage.endPeriod
            ),
          });
        });
        return labUsages;
      }
    }, []);
    return transformedSection;
  });

  const generateLabUsages = (usages) => {
    const newUsages = _.cloneDeep(usages);
    newUsages.sort((a, b) => a.shift - b.shift);

    //Padding
    if (newUsages.length === 0) {
      newUsages.push({ shift: -1 });
      newUsages.push({ shift: -1 });
      newUsages.push({ shift: -1 });
    } else if (newUsages.length === 1) {
      if (newUsages[0].shift === 1) {
        newUsages.push({ shift: -1 });
        newUsages.push({ shift: -1 });
      }
      if (newUsages[0].shift === 2) {
        newUsages.unshift({ shift: -1 });
        newUsages.push({ shift: -1 });
      }
      if (newUsages[0].shift === 3) {
        newUsages.unshift({ shift: -1 });
        newUsages.unshift({ shift: -1 });
      }
    } else if (newUsages.length === 2) {
      if (newUsages[0].shift === 1 && newUsages[1].shift === 2) {
        newUsages.push({ shift: -1 });
      }
      if (newUsages[0].shift === 1 && newUsages[1].shift === 3) {
        newUsages[2] = newUsages[1];
        newUsages[1] = { shift: -1 };
      }
      if (newUsages[0].shift === 2 && newUsages[1].shift === 3) {
        newUsages.unshift({ shift: -1 });
      }
    }

    return (
      <React.Fragment>
        {newUsages[0].shift === 1 ? (
          <Grid key={newUsages[0].id} item xs={4} lg={1} md={2}>
            <Usage
              courseName={newUsages[0].courseName}
              lecturerName={newUsages[0].lecturerName}
              startPeriod={newUsages[0].startPeriod}
              endPeriod={newUsages[0].endPeriod}
              index={newUsages[0].shift}
            />
          </Grid>
        ) : (
          <Grid item xs={4} lg={1} md={2} />
        )}
        {newUsages[1].shift === 2 ? (
          <Grid key={newUsages[1].id} item xs={4} lg={1} md={2}>
            <Usage
              courseName={newUsages[1].courseName}
              lecturerName={newUsages[1].lecturerName}
              startPeriod={newUsages[1].startPeriod}
              endPeriod={newUsages[1].endPeriod}
              index={newUsages[1].shift}
            />
          </Grid>
        ) : (
          <Grid item xs={4} lg={1} md={2} />
        )}
        {newUsages[2].shift === 3 ? (
          <Grid key={newUsages[2].id} item xs={4} lg={1} md={2}>
            <Usage
              courseName={newUsages[2].courseName}
              lecturerName={newUsages[2].lecturerName}
              startPeriod={newUsages[2].startPeriod}
              endPeriod={newUsages[2].endPeriod}
              index={newUsages[2].shift}
            />
          </Grid>
        ) : (
          <Grid item xs={4} lg={1} md={2} />
        )}
      </React.Fragment>
    );
  };

  const contents = props.displayedLabs.map((lab) => {
    return (
      <div key={lab.id} className={classes.row}>
        <div className={classes.labNameColumn}>
          <Lab name={lab.name} />
        </div>
        <Grid wrap="nowrap" container spacing={0}>
          {transformedSections[0] ? (
            transformedSections[0].find(
              (labUsages) => labUsages.lab === lab.name
            ) ? (
              generateLabUsages(
                transformedSections[0].find(
                  (labUsages) => labUsages.lab === lab.name
                ).usages
              )
            ) : (
              <React.Fragment>
                <Grid item xs={4} lg={1} md={2} />
                <Grid item xs={4} lg={1} md={2} />
                <Grid item xs={4} lg={1} md={2} />
              </React.Fragment>
            )
          ) : null}
          <Hidden smDown implementation="js">
            {transformedSections[1] ? (
              transformedSections[1].find(
                (labUsages) => labUsages.lab === lab.name
              ) ? (
                generateLabUsages(
                  transformedSections[1].find(
                    (labUsages) => labUsages.lab === lab.name
                  ).usages
                )
              ) : (
                <React.Fragment>
                  <Grid item xs={4} lg={1} md={2} />
                  <Grid item xs={4} lg={1} md={2} />
                  <Grid item xs={4} lg={1} md={2} />
                </React.Fragment>
              )
            ) : null}
          </Hidden>
          <Hidden mdDown implementation="js">
            {transformedSections[2] ? (
              transformedSections[2].find(
                (labUsages) => labUsages.lab === lab.name
              ) ? (
                generateLabUsages(
                  transformedSections[2].find(
                    (labUsages) => labUsages.lab === lab.name
                  ).usages
                )
              ) : (
                <React.Fragment>
                  <Grid item xs={4} lg={1} md={2} />
                  <Grid item xs={4} lg={1} md={2} />
                  <Grid item xs={4} lg={1} md={2} />
                </React.Fragment>
              )
            ) : null}
            {transformedSections[3] ? (
              transformedSections[3].find(
                (labUsages) => labUsages.lab === lab.name
              ) ? (
                generateLabUsages(
                  transformedSections[3].find(
                    (labUsages) => labUsages.lab === lab.name
                  ).usages
                )
              ) : (
                <React.Fragment>
                  <Grid item xs={4} lg={1} md={2} />
                  <Grid item xs={4} lg={1} md={2} />
                  <Grid item xs={4} lg={1} md={2} />
                </React.Fragment>
              )
            ) : null}
          </Hidden>
        </Grid>
      </div>
    );
  });

  return (
    <Paper elevation={0} className={classes.content}>
      {contents}
    </Paper>
  );
};

TimeTableContent.propTypes = {
  displayedLabUsages: PropTypes.array.isRequired,
  displayedLabs: PropTypes.array.isRequired,
};

export default TimeTableContent;

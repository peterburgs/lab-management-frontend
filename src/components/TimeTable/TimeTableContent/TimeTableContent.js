import { Grid, Paper, Hidden } from "@material-ui/core";
import React from "react";
import Lab from "../Lab/Lab";
import useStyles from "./TimeTableContent.styles";
import Usage from "../Usage/Usage";
import _ from "lodash";
import produce from "immer";

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

  const labs = props.displayedLabUsages.reduce((result, section) => {
    const labsInSection = section.map((labUsage) => labUsage.lab);
    result = _.union(result, labsInSection);
    return result;
  }, []);

  console.log(labs);

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
          });
        });
        return labUsages;
      }
    }, []);
    return transformedSection;
  });

  console.log(transformedSections);

  const contents = labs.map((lab) => {
    return (
      <div key={lab} className={classes.row}>
        <div className={classes.labNameColumn}>
          <Lab name={lab} />
        </div>
        <Grid wrap="nowrap" container spacing={0}>
          {transformedSections[0]
            ? transformedSections[0]
                .find((labUsages) => labUsages.lab === lab)
                .usages.map((usage) => (
                  <Grid key={usage.id} item xs={4} lg={1} md={2}>
                    <Usage
                      courseName={usage.courseName}
                      lecturerName={usage.lecturerName}
                      startPeriod={usage.startPeriod}
                      endPeriod={usage.endPeriod}
                      index={convertPeriodToShift(
                        usage.startPeriod,
                        usage.endPeriod
                      )}
                    />
                  </Grid>
                ))
            : null}
          {/* Padding */}
          {[
            ...Array(
              3 -
                (transformedSections[0]
                  ? transformedSections[0].find(
                      (labUsages) => labUsages.lab === lab
                    ).usages.length
                  : 0)
            ),
          ].map((_, index) => {
            return <Grid key={`padding-0-${index}`} item xs={4} lg={1} md={2} />;
          })}
          <Hidden smDown implementation="js">
            {transformedSections[1]
              ? transformedSections[1]
                  .find((labUsages) => labUsages.lab === lab)
                  .usages.map((usage) => (
                    <Grid key={usage.id} item xs={4} lg={1} md={2}>
                      <Usage
                        courseName={usage.courseName}
                        lecturerName={usage.lecturerName}
                        startPeriod={usage.startPeriod}
                        endPeriod={usage.endPeriod}
                        index={convertPeriodToShift(
                          usage.startPeriod,
                          usage.endPeriod
                        )}
                      />
                    </Grid>
                  ))
              : null}
            {/* Padding */}
            {[
              ...Array(
                3 -
                  (transformedSections[1]
                    ? transformedSections[1].find(
                        (labUsages) => labUsages.lab === lab
                      ).usages.length
                    : 0)
              ),
            ].map((_, index) => {
              return <Grid key={`padding-1-${index}`} item xs={4} lg={1} md={2} />;
            })}
          </Hidden>
          <Hidden mdDown implementation="js">
            {transformedSections[2]
              ? transformedSections[2]
                  .find((labUsages) => labUsages.lab === lab)
                  .usages.map((usage) => (
                    <Grid key={usage.id} item xs={4} lg={1} md={2}>
                      <Usage
                        courseName={usage.courseName}
                        lecturerName={usage.lecturerName}
                        startPeriod={usage.startPeriod}
                        endPeriod={usage.endPeriod}
                        index={convertPeriodToShift(
                          usage.startPeriod,
                          usage.endPeriod
                        )}
                      />
                    </Grid>
                  ))
              : null}
            {/* Padding */}
            {[
              ...Array(
                3 -
                  (transformedSections[2]
                    ? transformedSections[2].find(
                        (labUsages) => labUsages.lab === lab
                      ).usages.length
                    : 0)
              ),
            ].map((_, index) => {
              return <Grid key={`padding-2-${index}`} item xs={4} lg={1} md={2} />;
            })}
            {transformedSections[3]
              ? transformedSections[3]
                  .find((labUsages) => labUsages.lab === lab)
                  .usages.map((usage) => (
                    <Grid key={usage.id} item xs={4} lg={1} md={2}>
                      <Usage
                        courseName={usage.courseName}
                        lecturerName={usage.lecturerName}
                        startPeriod={usage.startPeriod}
                        endPeriod={usage.endPeriod}
                        index={convertPeriodToShift(
                          usage.startPeriod,
                          usage.endPeriod
                        )}
                      />
                    </Grid>
                  ))
              : null}
            {/* Padding */}
            {[
              ...Array(
                3 -
                  (transformedSections[3]
                    ? transformedSections[3].find(
                        (labUsages) => labUsages.lab === lab
                      ).usages.length
                    : 0)
              ),
            ].map((_, index) => {
              return <Grid key={`padding-3-${index}`} item xs={4} lg={1} md={2} />;
            })}
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

export default TimeTableContent;

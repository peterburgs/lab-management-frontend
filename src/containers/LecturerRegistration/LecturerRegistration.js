import React from "react";
import { Paper, Typography } from "@material-ui/core";
import useStyles from "./LecturerRegistration.styles";

const LecturerRegistration = () => {
  const classes = useStyles();

  // const renderSemester = (semester) => {
  //   return semester ? (
  //     <React.Fragment>
  //       <Typography
  //         display="inline"
  //         style={{ color: "white", fontSize: 20, fontWeight: 700 }}
  //       >
  //         Semester
  //       </Typography>
  //       <Typography
  //         style={{
  //           color: "rgba(255, 255, 255, 0.7)",
  //           fontSize: 14,
  //           fontWeight: 600,
  //         }}
  //       >
  //         Start date: {semester.startDate}
  //       </Typography>
  //       <Typography
  //         style={{
  //           color: "rgba(255, 255, 255, 0.7)",
  //           fontSize: 14,
  //           fontWeight: 600,
  //         }}
  //       >
  //         Number of weeks: {semester.numberOfWeek}
  //       </Typography>
  //     </React.Fragment>
  //   ) : (
  //     <Typography
  //       display="inline"
  //       style={{ color: "white", fontSize: 20, fontWeight: 700 }}
  //     >
  //       There is no semester!
  //     </Typography>
  //   );
  // };

  return (
    <div className={classes.lecturerRegistration}>
      <Paper className={classes.paper}>
        <Typography>Test</Typography>
      </Paper>
    </div>
  );
};

export default LecturerRegistration;

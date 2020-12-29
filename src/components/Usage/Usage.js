import React from "react";
import { Paper, Typography, IconButton } from "@material-ui/core";
import useStyles from "./Usage.styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";

const LabUsage = (props) => {
  const classes = useStyles({ index: props.index });

  return (
    <Paper className={classes.usage} elevation={1}>
      {!props.disableActions ? (
        <IconButton className={classes.editIcon}>
          <MoreVertIcon fontSize={"small"} />
        </IconButton>
      ) : null}

      <Typography
        style={{ fontSize: 13, fontWeight: 600, marginRight: "1rem" }}
      >
        {props.courseName}
      </Typography>
      <Typography style={{ fontSize: 12 }}>
        {props.lecturerName}
      </Typography>
      <Typography style={{ fontSize: 12 }}>
        Period: {props.startPeriod} - {props.endPeriod}
      </Typography>
    </Paper>
  );
};

LabUsage.propTypes = {
  index: PropTypes.number.isRequired,
  courseName: PropTypes.string.isRequired,
  lecturerName: PropTypes.string.isRequired,
  startPeriod: PropTypes.number.isRequired,
  endPeriod: PropTypes.number.isRequired,
};

export default LabUsage;

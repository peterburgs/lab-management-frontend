import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Slide,
  DialogContentText,
  Typography,
  IconButton,
} from "@material-ui/core";
import useStyles from "./RequestDialog.styles";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const CustomDialogTitle = withStyles(styles)((props) => {
  const { children, classes, onCancel, ...other } = props;
  return (
    <DialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onCancel ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onCancel}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const RequestDialog = (props) => {
  const classes = useStyles();
  const [request] = useState({
    id: "REQ-1",
    content: "Lab: A3-102\nTime: Week 3, Monday, period: 1-3",
    lecturer: "Le Vinh Thinh",
    courseName: "Introduction to information techonology - INTROIT1234",
    group: 1,
    openDate: "11/12/2020 7:00 AM",
    status: "open",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  });

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={props.isOpen}
      TransitionComponent={Transition}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      <CustomDialogTitle id="form-dialog-title" onCancel={props.onCancel}>
        Resolve request
      </CustomDialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>
          Course name
        </DialogContentText>
        <Typography className={classes.text}>{request.courseName}</Typography>
        <DialogContentText style={{ marginBottom: 0 }}>Group</DialogContentText>
        <Typography className={classes.text}>{request.group}</Typography>
        <DialogContentText style={{ marginBottom: 0 }}>
          Lecturer
        </DialogContentText>
        <Typography className={classes.text}>{request.lecturer}</Typography>
        <DialogContentText style={{ marginBottom: 0 }}>
          Request
        </DialogContentText>
        <Typography className={classes.text}>{request.content}</Typography>
        <DialogContentText style={{ marginBottom: 0 }}>
          Description
        </DialogContentText>
        <Typography className={classes.text}>{request.description}</Typography>
        <Button
          className={classes.button}
          variant="contained"
          onClick={props.onApprove}
          color="primary"
        >
          Approve
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={props.onCheckSchedule}
          color="primary"
        >
          Check schedule
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={props.onDeny}
          color="secondary"
        >
          Deny
        </Button>
      </DialogContent>
    </Dialog>
  );
};

RequestDialog.propTypes = {
  onApprove: PropTypes.func.isRequired,
  onCheckSchedule: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default RequestDialog;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import useStyles from "./ConfirmDialog.styles";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={props.isOpen}
      TransitionComponent={Transition}
      onClose={props.onCancel}
      aria-labelledby="confirm-dialog-title"
    >
      <DialogTitle id="confirm-dialog-title">
        Do you want to close this registration?
      </DialogTitle>
      <DialogActions style={{ padding: "16px 24px" }}>
        <Button onClick={props.onCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          style={{ borderRadius: 8 }}
          onClick={props.onSubmit}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ConfirmDialog;

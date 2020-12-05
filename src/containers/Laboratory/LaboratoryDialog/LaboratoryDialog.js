import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import useStyles from "./LaboratoryDialog.styles";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LaboratoryDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={props.isOpen}
      TransitionComponent={Transition}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {props.isEdit ? "Edit laboratory" : "Add a laboratory"}
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          label="Lab name"
          variant="outlined"
          className={classes.formElement}
        />
        <TextField
          required
          label="Capacity"
          variant="outlined"
          className={classes.formElement}
        />
      </DialogContent>
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

LaboratoryDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default LaboratoryDialog;

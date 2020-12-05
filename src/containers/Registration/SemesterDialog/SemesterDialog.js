import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import useStyles from "./SemesterDialog.styles";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SemesterDialog = (props) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [numOfWeeks, setNumOfWeeks] = useState(0);

  // If edit, query semester using useEffect

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={props.isOpen}
      TransitionComponent={Transition}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {props.isEdit ? "Edit duration" : "Start a semester"}
      </DialogTitle>
      <DialogContent>
        <DateTimePicker
          label="Start date"
          inputVariant="outlined"
          value={startDate}
          onChange={setStartDate}
          format="DD/MM/yyyy HH:mm"
          disablePast
          className={classes.formElement}
          required
        />
        <TextField
          id="numOfWeek"
          required
          label="Number of weeks"
          variant="outlined"
          className={classes.formElement}
          value={numOfWeeks}
          onChange={(e) => setNumOfWeeks(e.target.value)}
        />
      </DialogContent>
      <DialogActions style={{ padding: "16px 24px" }}>
        <Button onClick={props.onCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          style={{ borderRadius: 8, fontWeight: 700 }}
          onClick={props.onSubmit}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SemesterDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default SemesterDialog;

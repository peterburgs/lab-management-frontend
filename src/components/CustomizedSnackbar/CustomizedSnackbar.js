import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CustomizedSnackbars = (props) => {
  return (
    <Snackbar
      style={{ zIndex: 1301 }}
      open={props.open}
      autoHideDuration={1000}
      onClose={props.onClose}
    >
      <Alert onClose={props.onClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

CustomizedSnackbars.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.string,
  message: PropTypes.string,
};

export default CustomizedSnackbars;

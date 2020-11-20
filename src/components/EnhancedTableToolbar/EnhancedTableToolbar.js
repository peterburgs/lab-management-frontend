import React from "react";
import { Toolbar, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "./EnhancedTableToolbar.styles";

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" component="div">
        {props.title}
      </Typography>
      {props.registrationTable ? (
        <React.Fragment>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Generate lab usage
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            style={{minWidth: 100, backgroundColor: "#388E3C", color: "#fff"}}
          >
            Export
          </Button>
        </React.Fragment>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  registrationTable: PropTypes.bool,
};

export default EnhancedTableToolbar;

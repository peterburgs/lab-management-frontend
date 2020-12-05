import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "./EnhancedTableToolbar.styles";

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" component="div">
        {props.title}
      </Typography>
      {props.children}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
};

export default EnhancedTableToolbar;

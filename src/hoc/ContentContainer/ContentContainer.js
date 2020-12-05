import React from "react";
import useStyles from "./ContentContainer.styles";
import PropTypes from "prop-types";

const ContentContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.contentContainer}>
      <div className={classes.background}></div>
      <div className={classes.overlay}>{props.children}</div>
    </div>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ContentContainer;

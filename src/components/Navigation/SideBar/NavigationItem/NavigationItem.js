import React from "react";
import NavLink from "../../NavLink/NavLink";
import useStyles from "./NavigationItem.styles";

const NavigationItem = (props) => {
  const classes = useStyles();

  return (
    <NavLink
      className={classes.navigationItem}
      exact
      activeClassName={classes.active}
      to={props.link}
      onClick={props.onClick}
    >
      {props.icon ? props.icon : null}
      {props.children}
    </NavLink>
  );
};

export default NavigationItem;

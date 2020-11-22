/* eslint-disable react/prop-types */
import React from "react";
import Layout from "./hoc/Layout";
import useStyles from "./App.styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "fontsource-roboto";

import Schedule from "./containers/Schedule/Schedule";
import Registration from "./containers/Registration/Registration";
import Course from "./containers/Course/Course";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1A73E8",
    },
    secondary: {
      main: "#e7305b",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 12,
  },
});

function App() {
  const classes = useStyles();
  let routes = (
    <Switch>
      <Route path="/schedule">
        <Layout>
          <Schedule />
        </Layout>
      </Route>
      <Route path="/registration">
        <Layout registrationPage>
          <Registration />
        </Layout>
      </Route>
      <Route path="/courses">
        <Layout>
          <Course />
        </Layout>
      </Route>
    </Switch>
  );
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.app}>{routes}</div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;

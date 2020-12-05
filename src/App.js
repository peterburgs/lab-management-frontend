/* eslint-disable react/prop-types */
import React from "react";
import Layout from "./hoc/Layout/Layout";
import useStyles from "./App.styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "fontsource-roboto";

import Schedule from "./containers/Schedule/Schedule";
import Registration from "./containers/Registration/Registration";
import Course from "./containers/Course/Course";
import Laboratory from "./containers/Laboratory/Laboratory";
import Request from "./containers/Request/Request";
import Lecturer from "./containers/Lecturer/Lecturer";
import ContentContainer from "./hoc/ContentContainer/ContentContainer";

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
          <ContentContainer>
            <Schedule />
          </ContentContainer>
        </Layout>
      </Route>
      <Route path="/registration">
        <Layout>
          <ContentContainer>
            <Registration />
          </ContentContainer>
        </Layout>
      </Route>
      <Route path="/courses">
        <Layout>
          <ContentContainer>
            <Course />
          </ContentContainer>
        </Layout>
      </Route>
      <Route path="/laboratories">
        <Layout>
          <ContentContainer>
            <Laboratory />
          </ContentContainer>
        </Layout>
      </Route>
      <Route path="/requests">
        <Layout>
          <ContentContainer>
            <Request />
          </ContentContainer>
        </Layout>
      </Route>
      <Route path="/lecturers">
        <Layout>
          <ContentContainer>
            <Lecturer />
          </ContentContainer>
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

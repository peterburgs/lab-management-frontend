/* eslint-disable react/prop-types */
import React from "react";
import Layout from "./hoc/Layout/Layout";
import useStyles from "./App.styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useSelector } from "react-redux";

import "fontsource-roboto";

import Schedule from "./containers/Schedule/Schedule";
import Registration from "./containers/Registration/Registration";
import Course from "./containers/Course/Course";
import Lab from "./containers/Lab/Lab";
import Request from "./containers/Request/Request";
import User from "./containers/User/User";
import ContentContainer from "./hoc/ContentContainer/ContentContainer";
import Auth from "./containers/Auth/Auth";
import ResolveAuth from "./containers/Auth/ResolveAuth/ResolveAuth";
import Logout from "./containers/Auth/Logout/Logout";
import LecturerRegistration from "./containers/LecturerRegistration/LecturerRegistration";

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
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const user = useSelector((state) => state.auth.user);

  let routes = (
    <Switch>
      {localStorage.getItem("token") ? (
        <Route path="/">
          <ResolveAuth />
        </Route>
      ) : null}
      <Route path="/signin">
        <Auth />
      </Route>
      <Redirect to="/signin" />
    </Switch>
  );

  if (isAuthenticated && user.roles.indexOf("ADMIN") !== -1) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/registration" />
        </Route>
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
        <Route path="/labs">
          <Layout>
            <ContentContainer>
              <Lab />
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
        <Route path="/users">
          <Layout>
            <ContentContainer>
              <User />
            </ContentContainer>
          </Layout>
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  if (isAuthenticated && user.roles.indexOf("LECTURER") !== -1) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/registration" />
        </Route>
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
              <LecturerRegistration />
            </ContentContainer>
          </Layout>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.app}>{routes}</div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;

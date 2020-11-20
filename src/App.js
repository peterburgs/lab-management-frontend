/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import Layout from "./hoc/Layout";
import useStyles from "./App.styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import "fontsource-roboto";

const Schedule = React.lazy(() => import("./containers/Schedule/Schedule"));
const Registration = React.lazy(() =>
  import("./containers/Registration/Registration")
);

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
          <Suspense fallback={<CircularProgress />}>
            <Schedule />
          </Suspense>
        </Layout>
      </Route>
      <Route path="/registration">
        <Layout registrationPage>
          <Suspense fallback={<CircularProgress />}>
            <Registration />
          </Suspense>
        </Layout>
      </Route>
    </Switch>
  );
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>{routes}</div>
    </ThemeProvider>
  );
}

export default App;

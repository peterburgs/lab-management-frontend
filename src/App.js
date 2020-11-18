import React from "react";
import Layout from "./hoc/Layout";
import useStyles from "./App.styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

import "fontsource-roboto";

import Schedule from "./containers/Schedule/Schedule";

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
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Layout>
          <Schedule />
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;

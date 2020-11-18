import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  requestPending: {
    padding: "0.5rem",
    background: "#1976D2",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    minWidth: 270,
    "& button": {
      marginLeft: "auto",
      textTransform: "none",
      fontSize: 12,
      border:"#fff 1px solid",
      
    },
    "& svg": {
      marginRight: "0.5rem",
      color: "white",
    },
    "& p": {
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      background: "#F0F2F5",
      "& svg": {
        color: "#1976D2",
      },
      "& p": {
        color: "#1976D2",
      },
    },
  },
}));

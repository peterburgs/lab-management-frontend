import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  requestPending: {
    borderRadius: 8,
    padding: "0.5rem",
    background: "#1976D2",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    "& button": {
      marginLeft: "0.5rem",
      textTransform: "none",
      fontSize: 12,
      border:"#fff 1px solid",
      borderRadius: 8,
    },
    "& svg": {
      marginRight: "0.5rem",
      color: "white",
    },
    "& p": {
      color: "white",
      fontSize: 12,
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

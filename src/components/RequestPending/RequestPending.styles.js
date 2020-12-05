import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
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
  },
}));

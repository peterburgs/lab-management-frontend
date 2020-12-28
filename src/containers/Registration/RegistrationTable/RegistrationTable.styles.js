import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  registrationTable: {
    width: "100%",
  },
  paper: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    textTransform: "none",
    minWidth: 150,
    marginLeft: "0.5rem",
  },
  row: {
    "& td": {
      fontSize: 13,
    },
  },
  button: {
    borderRadius: 10,
    textTransform: "none",
    minWidth: 200,
    marginLeft: "0.5rem",
  },
}));

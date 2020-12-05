import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  registrationTable: {
    width: "100%",
  },
  paper: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 24,
  },
  row: {
    "&:hover": {
      cursor: "pointer",
      background: `${theme.palette.primary.main} !important`,
      "& td": {
        color: "white",
      },
      "& th": {
        color: "white",
      },
    },
  },
  button: {
    borderRadius: 8,
    textTransform: "none",
    minWidth: 150,
    marginLeft: "0.5rem",
  },
}));

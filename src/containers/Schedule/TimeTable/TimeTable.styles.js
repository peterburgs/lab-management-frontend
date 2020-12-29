import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  timeTable: {
    width: "100%",
    marginTop: "1rem",
    borderRadius: 8,
    marginBottom: 24,
  },
  paper: {
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },
  labCell: {
    border: "none",
  },
  dayCell: {
    border: "none",
    paddingLeft: 0,
    paddingRight: 0,
  },
  toolBar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: 0,
    justifyContent: "flex-end",
  },
}));

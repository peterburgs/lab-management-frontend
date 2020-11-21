import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  timeTable: {
    width: "100%",
    marginTop: "1rem",
    borderRadius: 8,
    marginBottom: 24,
  },
  labTable: {
    maxWidth: 100,
  },
  dayTable: {
    minWidth: 1232,
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
});

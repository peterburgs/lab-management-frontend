import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  header: {
    display: "flex",
    borderRadius: "8px 8px 0px 0px",
  },
  labNameColumn: {
    minWidth: 80,
  },
  title: {
    fontWeight: 700,
    padding: 12,
    fontSize: 12,
    textAlign: "center",
    borderRight: "1px solid rgba(0,0,0,0.2)",
  },
}));

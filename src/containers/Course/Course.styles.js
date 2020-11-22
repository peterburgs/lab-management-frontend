import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  course: {
    paddingTop: 24,
  },
  paper: {
    padding: "0.5rem",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 8,
    textTransform: "none",
  },
  dialog: {
    borderRadius: 16,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

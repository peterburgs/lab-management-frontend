import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  lecturerRegistration: {
    paddingTop: 24,
  },
  paper: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  text: {
    fontSize: 20,
    color: "#ef4f4f",
  },
}));

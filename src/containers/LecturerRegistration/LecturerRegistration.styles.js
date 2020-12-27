import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  lecturerRegistration: {
    paddingTop: 24,
  },
  paper: {
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

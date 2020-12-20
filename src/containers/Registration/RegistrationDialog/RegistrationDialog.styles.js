import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  formElement: {
    marginBottom: "1rem",
    width: "100%",
  },
  dialog: {
    borderRadius: 8,
    minWidth: 500,
  },
  card: {
    marginTop: "1rem",
  },
  buttonProgress: {
    color: theme.palette.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

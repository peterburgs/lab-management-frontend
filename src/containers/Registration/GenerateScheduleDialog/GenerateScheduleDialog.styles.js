import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  dialog: {
    borderRadius: 8,
    minHeight: "100px",
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

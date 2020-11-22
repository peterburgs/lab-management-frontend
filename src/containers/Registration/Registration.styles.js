import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  registration: {
    position: "relative",
    margin: "0px -24px",
  },
  background: {
    background: theme.palette.primary.main,
    height: 300,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  overlayItem: {
    marginTop: 24,
    zIndex: 1099,
  },
  semester: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  paper: {
    padding: '0.5rem',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    textTransform: "none",
  },
  dialog: {
    borderRadius: 16,
  }
}));

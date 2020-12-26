import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  auth: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    justifyContent: "space-between",
    margin: "0 10rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      margin: "0 1rem",
    },
  },
  image: {
    maxWidth: "70%",
  },
  button: {
    padding: "0.7rem 1.5rem",
    borderRadius: 8,
    textTransform: "none",
    fontSize: 16,
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

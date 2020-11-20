import { makeStyles } from "@material-ui/core/styles";

const sideBarOpenWidth = 225;
const sideBarCloseWidth = 60;

export default makeStyles((theme) => ({
  appBarRegistration: {
    backgroundColor: "#1A73E8 !important",
  },
  userSectionRegistration: {
    "& p": {
      color: "#fff !important",
    },
    "& svg": {
      color: "#fff !important",
    },
  },
  appBar: {
    minHeight: 56,
    [theme.breakpoints.up("md")]: {
      background: "#F0F2F5",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
      width: `calc(100% - ${sideBarCloseWidth}px)`,
      marginLeft: sideBarCloseWidth,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  appBarShift: {
    [theme.breakpoints.up("md")]: {
      background: "#F0F2F5",
      width: `calc(100% - ${sideBarOpenWidth}px)`,
      marginLeft: sideBarOpenWidth,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  hide: {
    display: "none",
  },
  menuIcon: {
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    minWidth: 369,
    padding: "0 24px",
    marginTop: 56,
    [theme.breakpoints.up("md")]: {
      marginTop: 64,
    },
  },
  grow: {
    flexGrow: 1,
  },
  userSection: {
    "& p": {
      margin: "0 0.5rem",
      display: "inline",
      color: "#1B3A57",
      [theme.breakpoints.down("sm")]: {
        color: "#fff",
        display: "none",
      },
    },
    "& svg": {
      color: "#1B3A57",
      [theme.breakpoints.down("sm")]: {
        color: "#fff",
      },
    },
  },
}));

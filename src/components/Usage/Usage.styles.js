import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  usage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: (props) =>
      `${
        props.index % 3 === 1
          ? "#FFE5EC"
          : props.index % 3 === 2
          ? "#D7F2FF"
          : "#EEEAF7"
      }`,
    color: "#000",
    height: 140,
    borderLeft: (props) =>
      `${
        props.index % 3 === 1
          ? "3px solid rgb(254,63,113)"
          : props.index % 3 === 2
          ? "3px solid rgb(74,137,162)"
          : "3px solid rgb(101,55,192)"
      }`,
    paddingLeft: "0.2rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    marginRight: "0.5rem",
    boxSizing: "border-box",
    textAlign: "left",
    position: "relative",
  },
  editIcon: {
    padding: 0,
    width: 10,
    left: 115,
    position: "absolute",
  },
}));

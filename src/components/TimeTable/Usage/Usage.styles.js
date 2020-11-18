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
    width: "95%",
    height: 166,
    borderLeft: (props) =>
      `${
        props.index % 3 === 1
          ? "3px solid rgb(254,63,113)"
          : props.index % 3 === 2
          ? "3px solid rgb(74,137,162)"
          : "3px solid rgb(101,55,192)"
      }`,
    borderRadius: 0,
    paddingLeft: "0.2rem",
    paddingTop: "0.9rem",
    paddingBottom: "0.9rem",
    boxSizing: "border-box",
    wordWrap: "break-word",
  },
  editIcon: {
    padding: 0,
    width: 10,
    justifySelf: 'end',
  },
}));

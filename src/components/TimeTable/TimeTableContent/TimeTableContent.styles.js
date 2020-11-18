import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  content: {
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: 'column',
    maxHeight: 500,
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  labNameColumn: {
    minWidth: 80,
  },
  row: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    maxHeight: 166,
    marginBottom: '0.2rem',
    boxSizing: 'border-box'
  },
}));

import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    flex: '1 1 100%',
  },
  button: {
    borderRadius: 8,
    textTransform: 'none',
    minWidth: 150,
    marginLeft: '0.5rem',
  }
}));

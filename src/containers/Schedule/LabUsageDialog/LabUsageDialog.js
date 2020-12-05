import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import useStyles from "./LabUsageDialog.styles";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LabUsageDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={props.isOpen}
      TransitionComponent={Transition}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a lab usage</DialogTitle>
      <DialogContent>
        <DialogContentText>Teaching Information</DialogContentText>
        <TextField
          required
          label="Course ID"
          variant="outlined"
          className={classes.formElement}
        />
        <TextField
          required
          label="Group"
          variant="outlined"
          className={classes.formElement}
        />
        <TextField
          required
          label="Lecturer ID"
          variant="outlined"
          className={classes.formElement}
        />
        <DialogContentText>Teaching time</DialogContentText>
        <FormControl variant="outlined" className={classes.formElement}>
          <InputLabel id="demo-simple-select-outlined-label">Week</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={week}
            // onChange={handleChange}
            label="Week"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formElement}>
              <InputLabel id="demo-simple-select-outlined-label">
                Day of week
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={dayOfWeek}
                // onChange={handleChange}
                label="Day of week"
              >
                <MenuItem value={0}>Monday</MenuItem>
                <MenuItem value={1}>Tuesday</MenuItem>
                <MenuItem value={2}>Wednesday</MenuItem>
                <MenuItem value={3}>Thursday</MenuItem>
                <MenuItem value={4}>Friday</MenuItem>
                <MenuItem value={5}>Saturday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formElement}>
              <InputLabel id="demo-simple-select-outlined-label">
                Start
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={week}
                // onChange={handleChange}
                label="Start"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formElement}>
              <InputLabel id="demo-simple-select-outlined-label">
                End
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // value={week}
                // onChange={handleChange}
                label="End"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <DialogContentText>Choose lab to change</DialogContentText>

        <FormControl variant="outlined" className={classes.formElement}>
          <InputLabel id="demo-simple-select-outlined-label">Lab</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={week}
            // onChange={handleChange}
            label="Lab"
          >
            <MenuItem value={"A3-102"}>A3-102</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions style={{ padding: "16px 24px" }}>
        <Button onClick={props.onCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          style={{ borderRadius: 8 }}
          onClick={props.onSubmit}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LabUsageDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default LabUsageDialog;

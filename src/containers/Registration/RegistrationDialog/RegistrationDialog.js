import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Slide,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid,
  IconButton,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import useStyles from "./RegistrationDialog.styles";
import PropTypes from "prop-types";
import produce from "immer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegistrationForm = (props) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allCourses, setAllCourses] = useState(true);
  const [addedCourses, setAddedCourses] = useState([]);
  const [courseToAdd, setCourseToAdd] = useState("");

  const handleCheckAllCourses = (e) => {
    setAllCourses(e.target.checked);
  };

  const handleDelete = (course) => {
    console.log(course);
    setAddedCourses((addedCourse) => {
      return addedCourse.filter((c) => c !== course);
    });
  };

  const handleAddCourse = () => {
    setAddedCourses(
      produce((draft) => {
        draft.push(courseToAdd);
      })
    );
  };

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      open={props.isOpen}
      TransitionComponent={Transition}
      onClose={props.onCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Open a registration</DialogTitle>
      <DialogContent>
        <DateTimePicker
          label="Start date"
          inputVariant="outlined"
          value={startDate}
          onChange={setStartDate}
          format="DD/MM/yyyy HH:mm"
          disablePast
          className={classes.formElement}
        />
        <DateTimePicker
          label="End date"
          inputVariant="outlined"
          value={endDate}
          onChange={setEndDate}
          format="DD/MM/yyyy HH:mm"
          disablePast
          className={classes.formElement}
        />
        <DialogContentText style={{ marginBottom: 0 }}>
          Apply to course
        </DialogContentText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={allCourses}
                onChange={handleCheckAllCourses}
                name="allCourses"
              />
            }
            label="All courses"
          />
        </FormGroup>
        <Typography
          style={{ fontSize: 10, marginBottom: "1rem" }}
          color="secondary"
        >
          * Every course can register to this registration
        </Typography>
        {!allCourses ? (
          <React.Fragment>
            <Grid container spacing={1}>
              <Grid item xs={11}>
                <TextField
                  id="courseId"
                  required
                  label="Course ID"
                  variant="outlined"
                  className={classes.formElement}
                  value={courseToAdd}
                  onChange={(e) => setCourseToAdd(e.target.value)}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  style={{ borderRadius: 8, fontWeight: 700, height: "80%" }}
                  color="primary"
                  onClick={handleAddCourse}
                >
                  +
                </IconButton>
              </Grid>
            </Grid>
            <div className={classes.addedCourses}>
              {addedCourses.map((course) => (
                <Chip
                  key={course}
                  label={course}
                  onDelete={() => handleDelete(course)}
                  color="primary"
                  style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                />
              ))}
            </div>
          </React.Fragment>
        ) : null}
        <DialogContentText>Policies</DialogContentText>
        <Button
          variant="outlined"
          disableElevation
          style={{
            borderRadius: 8,
            marginBottom: "1rem",
            color: "#388E3C",
            border: "1px solid #388E3C",
          }}
          color="primary"
        >
          Add policies
        </Button>
        <Card elevation={3} className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Networking Essentials
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Software required: VMware
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Edit
            </Button>
            <Button size="small" color="primary">
              Delete
            </Button>
          </CardActions>
        </Card>
      </DialogContent>
      <DialogActions style={{ padding: "16px 24px" }}>
        <Button onClick={props.onCancel} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          style={{ borderRadius: 8, fontWeight: 700 }}
          onClick={props.onSubmit}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RegistrationForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default RegistrationForm;

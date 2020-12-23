import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
  DialogContentText,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./TeachingDialog.styles";
import { useDispatch, useSelector, batch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TeachingDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <Dialog
        classes={{ paper: classes.dialog }}
        open={props.isOpen}
        TransitionComponent={Transition}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">{"Add new course"}</DialogTitle>
          <DialogContent>
            <TextField
              id="courseId"
              name="courseId"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Course ID"
              variant="outlined"
              defaultValue={""}
              className={classes.formElement}
              error={Boolean(errors.courseId)}
              helperText={errors.courseId ? "*This field is required" : null}
            />

            <TextField
              id="group"
              name="group"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Group"
              variant="outlined"
              defaultValue={""}
              className={classes.formElement}
              error={Boolean(errors.group)}
              helperText={errors.group ? "*This field is required" : null}
            />
            <TextField
              id="numberOfStudents"
              name="numberOfStudents"
              type="number"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Number of students"
              variant="outlined"
              defaultValue={""}
              className={classes.formElement}
              error={Boolean(errors.numberOfStudents)}
              helperText={
                errors.numberOfStudents ? "*This field is required" : null
              }
            />
            <TextField
              id="theoryRoom"
              name="theoryRoom"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Theory room"
              variant="outlined"
              defaultValue={""}
              className={classes.formElement}
              error={Boolean(errors.theoryRoom)}
              helperText={errors.theoryRoom ? "*This field is required" : null}
            />
            <TextField
              id="numberOfPracticalWeeks"
              name="numberOfPracticalWeeks"
              type="number"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Number of practical weeks"
              variant="outlined"
              defaultValue={""}
              className={classes.formElement}
              error={Boolean(errors.numberOfPracticalWeeks)}
              helperText={
                errors.numberOfPracticalWeeks ? "*This field is required" : null
              }
            />
            <DialogContentText style={{ marginBottom: 0 }}>
              Teaching time
            </DialogContentText>
            <Grid container>
              <Grid item xs={5}>
                <Controller
                  name="dayOfWeek"
                  control={control}
                  rules={{ required: true }}
                  render={(props) => (
                    <FormControl
                      variant="outlined"
                      className={classes.formElement}
                    >
                      <InputLabel id="dayOfWeek-label">Day of week</InputLabel>
                      <Select
                        labelId="dayOfWeek-label"
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        label="Day of week"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Monday</MenuItem>
                        <MenuItem value={1}>Tuesday</MenuItem>
                        <MenuItem value={2}>Wednesday</MenuItem>
                        <MenuItem value={4}>Thursday</MenuItem>
                        <MenuItem value={5}>Friday</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="startPeriod"
                  control={control}
                  rules={{ required: true }}
                  render={(props) => (
                    <FormControl
                      variant="outlined"
                      className={classes.formElement}
                    >
                      <InputLabel id="startPeriod-label">
                        Start period
                      </InputLabel>
                      <Select
                        labelId="startPeriod-label"
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        label="Start period"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
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
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name="endPeriod"
                  control={control}
                  rules={{ required: true }}
                  render={(props) => (
                    <FormControl
                      variant="outlined"
                      className={classes.formElement}
                    >
                      <InputLabel id="endPeriod-label">End period</InputLabel>
                      <Select
                        labelId="endPeriod-label"
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        label="End period"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
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
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: "16px 24px" }}>
            <Button onClick={props.onCancel} color="primary">
              Cancel
            </Button>
            <div style={{ position: "relative" }}>
              <Button
                variant="contained"
                disableElevation
                style={{ borderRadius: 8, fontWeight: 700 }}
                color="primary"
                type="submit"
                disabled={false}
              >
                Submit
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default TeachingDialog;

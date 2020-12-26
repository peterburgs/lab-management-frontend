import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import useStyles from "./LabDialog.styles";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  addLab,
  addLabRefreshed,
  updateLab,
  updateLabRefreshed,
  getLabById,
} from "../LabSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useAddLab = () => {
  const dispatch = useDispatch();

  const addLabStatus = useSelector((state) => state.labs.addLabStatus);
  const addLabError = useSelector((state) => state.labs.addLabError);

  const handleAddLab = async (lab) => {
    try {
      const res = await dispatch(addLab(lab));
      unwrapResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return [addLabStatus, addLabError, handleAddLab];
};

const useUpdateLab = () => {
  const dispatch = useDispatch();

  const updateLabStatus = useSelector((state) => state.labs.updateLabStatus);
  const updateLabError = useSelector((state) => state.labs.updateLabError);

  const handleUpdateLab = async (lab) => {
    try {
      const updateLabRes = await dispatch(updateLab(lab));
      unwrapResult(updateLabRes);
    } catch (err) {
      console.log(err);
    }
  };

  return [updateLabStatus, updateLabError, handleUpdateLab];
};

const LabDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [addLabStatus, addLabError, handleAddLab] = useAddLab();

  const [updateLabStatus, updateLabError, handleUpdateLab] = useUpdateLab();

  const labIdToEdit = useSelector((state) => state.labs.labIdToEdit);

  useEffect(() => {
    if (labIdToEdit) {
      (async () => {
        const result = await dispatch(getLabById(labIdToEdit));
        unwrapResult(result);
        setValue("labName", result.payload.lab.labName);
        setValue("capacity", result.payload.lab.capacity);
      })();
    }
  }, [dispatch, labIdToEdit, setValue]);

  const onSubmit = async (data) => {
    if (labIdToEdit) {
      await handleUpdateLab(data);
      props.onFinish();
    } else {
      await handleAddLab(data);
      props.onFinish();
    }
  };

  const handleClose = useCallback(() => {
    batch(() => {
      dispatch(updateLabRefreshed());
      dispatch(addLabRefreshed());
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={
          addLabStatus === "failed" || updateLabStatus === "failed"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={addLabStatus === "failed" ? addLabError : updateLabError}
        severity="error"
      />
      <CustomizedSnackbar
        open={
          addLabStatus === "succeeded" || updateLabStatus === "succeeded"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          addLabStatus === "succeeded"
            ? "Add new lab successfully"
            : "Update lab successfully"
        }
        severity="success"
      />
      <Dialog
        classes={{ paper: classes.dialog }}
        open={props.isOpen}
        TransitionComponent={Transition}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">
            {labIdToEdit ? "Edit lab" : "Add new lab"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="labName"
              name="labName"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Lab Name"
              variant="outlined"
              defaultValue={labIdToEdit ? " " : ""}
              autoFocus={labIdToEdit ? true : false}
              className={classes.formElement}
              error={Boolean(errors.labName)}
              helperText={errors.labName ? "*This field is required" : null}
            />

            <TextField
              id="capacity"
              name="capacity"
              autoComplete="off"
              type="number"
              inputRef={register({ required: true })}
              label="Capacity"
              variant="outlined"
              defaultValue={labIdToEdit ? 0 : null}
              className={classes.formElement}
              error={Boolean(errors.capacity)}
              helperText={errors.capacity ? "*This field is required" : null}
            />
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
                disabled={
                  addLabStatus === "loading" || updateLabStatus === "loading"
                }
              >
                Submit
              </Button>
              {(addLabStatus === "loading" ||
                updateLabStatus === "loading") && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default LabDialog;

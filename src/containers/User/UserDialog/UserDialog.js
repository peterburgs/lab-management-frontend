import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Slide,
  Checkbox,
  FormControlLabel,
  DialogContentText,
} from "@material-ui/core";
import useStyles from "./UserDialog.styles";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  addUser,
  addUserRefreshed,
  updateUser,
  updateUserRefreshed,
  getUserById,
} from "../UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useAddUser = () => {
  const dispatch = useDispatch();

  const addUserStatus = useSelector((state) => state.users.addUserStatus);
  const addUserError = useSelector((state) => state.users.addUserError);

  const handleAddUser = async (user) => {
    try {
      const res = await dispatch(addUser(user));
      unwrapResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return [addUserStatus, addUserError, handleAddUser];
};

const useUpdateUser = () => {
  const dispatch = useDispatch();

  const updateUserStatus = useSelector((state) => state.users.updateUserStatus);
  const updateUserError = useSelector((state) => state.users.updateUserError);

  const handleUpdateUser = async (user) => {
    try {
      const updateUserRes = await dispatch(updateUser(user));
      unwrapResult(updateUserRes);
    } catch (err) {
      console.log(err);
    }
  };

  return [updateUserStatus, updateUserError, handleUpdateUser];
};

const UserDialog = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setValue, control } = useForm();
  const [addUserStatus, addUserError, handleAddUser] = useAddUser();

  const [updateUserStatus, updateUserError, handleUpdateUser] = useUpdateUser();

  const userIdToEdit = useSelector((state) => state.users.userIdToEdit);

  useEffect(() => {
    if (userIdToEdit) {
      (async () => {
        const result = await dispatch(getUserById(userIdToEdit));
        unwrapResult(result);
        setValue("fullName", result.payload.user.fullName);
        setValue("email", result.payload.user.email);
        setValue("userId", result.payload.user._id);
        setValue(
          "adminRole",
          result.payload.user.roles.indexOf("ADMIN") !== -1
        );
        setValue(
          "lecturerRole",
          result.payload.user.roles.indexOf("LECTURER") !== -1
        );
      })();
    }
  }, [dispatch, userIdToEdit, setValue]);

  const onSubmit = async (data) => {
    if (userIdToEdit) {
      await handleUpdateUser(data);
      props.onFinish();
    } else {
      await handleAddUser(data);
      props.onFinish();
    }
  };

  const handleClose = useCallback(() => {
    batch(() => {
      dispatch(updateUserRefreshed());
      dispatch(addUserRefreshed());
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <CustomizedSnackbar
        open={
          addUserStatus === "failed" || updateUserStatus === "failed"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={addUserStatus === "failed" ? addUserError : updateUserError}
        severity="error"
      />
      <CustomizedSnackbar
        open={
          addUserStatus === "succeeded" || updateUserStatus === "succeeded"
            ? true
            : false
        }
        onClose={() => handleClose()}
        message={
          addUserStatus === "succeeded"
            ? "Add new user successfully"
            : "Update user successfully"
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
            {userIdToEdit ? "Edit user" : "Add new user"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="userId"
              name="userId"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="User ID"
              variant="outlined"
              disabled={userIdToEdit ? true : false}
              defaultValue={userIdToEdit ? " " : ""}
              autoFocus={userIdToEdit ? true : false}
              className={classes.formElement}
              error={Boolean(errors.userId)}
              helperText={errors.userId ? "*This field is required" : null}
            />

            <TextField
              id="fullName"
              name="fullName"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Full name"
              variant="outlined"
              defaultValue={userIdToEdit ? " " : ""}
              className={classes.formElement}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName ? "*This field is required" : null}
            />
            <TextField
              id="email"
              name="email"
              autoComplete="off"
              inputRef={register({ required: true })}
              label="Email"
              variant="outlined"
              defaultValue={userIdToEdit ? 0 : null}
              className={classes.formElement}
              error={Boolean(errors.email)}
              helperText={errors.email ? "*This field is required" : null}
            />
            <DialogContentText style={{ marginBottom: 0 }}>
              Role
            </DialogContentText>
            <Controller
              name="adminRole"
              control={control}
              defaultValue={false}
              render={(props) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.value}
                      onChange={(e) => props.onChange(e.target.checked)}
                      name="adminRole"
                      color="primary"
                    />
                  }
                  label="Admin"
                />
              )}
            />
            <Controller
              name="lecturerRole"
              control={control}
              defaultValue={false}
              render={(props) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.value}
                      onChange={(e) => props.onChange(e.target.checked)}
                      name="lecturerRole"
                      color="primary"
                    />
                  }
                  label="Lecturer"
                />
              )}
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
                  addUserStatus === "loading" || updateUserStatus === "loading"
                }
              >
                Submit
              </Button>
              {(addUserStatus === "loading" ||
                updateUserStatus === "loading") && (
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

export default UserDialog;

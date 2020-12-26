import React, { useState, useEffect, useCallback } from "react";
import useStyles from "./User.styles";
import {
  Grid,
  Paper,
  IconButton,
  InputBase,
  Snackbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import UserTable from "./UserTable/UserTable";
import UserDialog from "./UserDialog/UserDialog";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  setUserIdToEdit,
  setUserIdToDelete,
  search,
  fetchUserRefreshed,
  deleteUser,
  deleteUserRefreshed,
} from "./UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner/Spinner";
import RefreshIcon from "@material-ui/icons/Refresh";

const useFetchUser = () => {
  const dispatch = useDispatch();

  const fetchUserStatus = useSelector(
    (state) => state.users.fetchUserStatus
  );
  const fetchUserError = useSelector(
    (state) => state.users.fetchUserError
  );

  useEffect(() => {
    if (fetchUserStatus === "idle") {
      (async () => {
        try {
          const fetchUserResult = await dispatch(fetchUser());
          unwrapResult(fetchUserResult);
        } catch (err) {
          console.log(err);
        }
      })();
    }
    return () => {
      if (fetchUserStatus === "failed" || fetchUserStatus === "succeeded") {
        dispatch(fetchUserRefreshed());
      }
    };
  }, [dispatch, fetchUserStatus]);

  return [fetchUserStatus, fetchUserError];
};

const useDeleteUser = () => {
  const dispatch = useDispatch();

  const deleteUserStatus = useSelector(
    (state) => state.users.deleteUserStatus
  );
  const deleteUserError = useSelector(
    (state) => state.users.deleteUserError
  );

  const handleDeleteUser = async (userId) => {
    try {
      const deleteUserRes = await dispatch(deleteUser(userId));
      unwrapResult(deleteUserRes);
    } catch (err) {
      console.log(err);
    }
  };

  return [deleteUserStatus, deleteUserError, handleDeleteUser];
};

const User = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openedUserDialog, setOpenedUserDialog] = useState(false);

  // Application state
  const searchResult = useSelector((state) => state.users.searchResult);
  const userIdToDelete = useSelector(
    (state) => state.users.userIdToDelete
  );
  const userIdToEdit = useSelector((state) => state.users.userIdToEdit);

  // Fetch User state
  const [fetchUserStatus, fetchUserError] = useFetchUser();

  // Delete User state
  const [
    deleteUserStatus,
    deleteUserError,
    handleDeleteUser,
  ] = useDeleteUser();

  const handleSearch = (e) => {
    dispatch(search(e.target.value));
  };

  const handleDelete = useCallback(async () => {
    await handleDeleteUser(userIdToDelete);
    dispatch(setUserIdToDelete(null));
  }, [handleDeleteUser, dispatch, userIdToDelete]);

  return (
    <div className={classes.user}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={fetchUserStatus === "failed" ? true : false}
        autoHideDuration={6000}
        message={fetchUserError}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => dispatch(fetchUserRefreshed())}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <UserDialog
        isOpen={userIdToEdit ? true : openedUserDialog}
        onCancel={() => {
          userIdToEdit
            ? dispatch(setUserIdToEdit(null))
            : setOpenedUserDialog(false);
        }}
        onFinish={() => {
          userIdToEdit
            ? dispatch(setUserIdToEdit(null))
            : setOpenedUserDialog(false);
        }}
      />
      <ConfirmDialog
        isOpen={Boolean(userIdToDelete)}
        onCancel={() => dispatch(setUserIdToDelete(null))}
        onSubmit={handleDelete}
        onLoading={deleteUserStatus === "loading"}
        onClose={() => dispatch(deleteUserRefreshed())}
        error={deleteUserError}
        success={
          deleteUserStatus === "succeeded"
            ? "Delete User successfully"
            : null
        }
        title="Do you want to delete the User?"
      />
      {fetchUserStatus === "loading" || fetchUserStatus === "failed" ? (
        <Spinner />
      ) : (
        <Grid container justify="center">
          <Grid item xs={11}>
            <Paper component="form" className={classes.paper}>
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                onChange={handleSearch}
                className={classes.input}
                placeholder="Enter full name"
                inputProps={{
                  "aria-label": "enter full name",
                }}
              />
            </Paper>
          </Grid>
          <Grid style={{ marginTop: 24 }} item xs={11}>
            <UserTable
              onAddUser={() => setOpenedUserDialog(true)}
              users={searchResult}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default User;

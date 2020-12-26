import {
  Button,
  Snackbar,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React, { useState, useCallback, useEffect } from "react";
import useStyles from "./Auth.styles";
import authBackground from "../../assets/images/auth-background.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { getUserRefresh, logout } from "./AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import CloseIcon from "@material-ui/icons/Close";
import { getUser } from "./AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CircularProgress from "@material-ui/core/CircularProgress";

const clientId =
  "842135343547-0l11d5qs9q4jqchn7i45p75e5bf2jpqf.apps.googleusercontent.com";

const useGetUser = () => {
  const dispatch = useDispatch();
  const getUserStatus = useSelector((state) => state.auth.getUserStatus);
  const getUserError = useSelector((state) => state.auth.getUserError);

  const handleGetUser = async ({ email, token }) => {
    console.log(email);
    try {
      const res = await dispatch(getUser({ email, token }));
      unwrapResult(res);
    } catch (err) {
      console.log(err);
    }
  };

  return [getUserStatus, getUserError, handleGetUser];
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [authError, setAuthError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const [getUserStatus, getUserError, handleGetUser] = useGetUser();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const handleAuthSuccess = useCallback(
    async (res) => {
      const expirationDate = new Date(
        new Date().getTime() + res.tokenObj.expires_in * 1000
      );
      localStorage.setItem("token", res.tokenObj.id_token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("name", res.profileObj.name);
      localStorage.setItem("imageUrl", res.profileObj.imageUrl);
      localStorage.setItem("email", res.profileObj.email);
      await handleGetUser({
        email: String(res.profileObj.email),
        token: res.tokenObj.id_token,
        expirationDate,
      });
    },
    [handleGetUser]
  );

  const handleAuthError = useCallback((res) => {
    setAuthError(res);
  }, []);

  const handleClose = useCallback(() => {
    setAuthError(null);
    dispatch(getUserRefresh());
  }, [setAuthError, dispatch]);

  return (
    <div className={classes.auth}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={authError || getUserStatus === "failed" ? true : false}
        autoHideDuration={6000}
        onClose={handleClose}
        message={authError ? authError : getUserError}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <img
        className={classes.image}
        alt="auth-background"
        src={authBackground}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <GoogleLogin
          clientId={clientId}
          onSuccess={handleAuthSuccess}
          onFailure={handleAuthError}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <div style={{ position: "relative" }}>
              <Button
                className={classes.button}
                startIcon={<FontAwesomeIcon icon={faGoogle} />}
                variant="contained"
                color="primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login with Google
              </Button>
              {getUserStatus === "loading" && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              name="adminRole"
              color="primary"
            />
          }
          label="Admin"
        />
      </div>
    </div>
  );
};

export default Auth;

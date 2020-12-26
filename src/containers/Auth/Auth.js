import { Button, Snackbar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Auth.styles";
import authBackground from "../../assets/images/auth-background.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authSuccess, logout } from "./AuthSlice";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import CloseIcon from "@material-ui/icons/Close";

const clientId =
  "842135343547-0l11d5qs9q4jqchn7i45p75e5bf2jpqf.apps.googleusercontent.com";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [authError, setAuthError] = useState(null);

  const handleAuthSuccess = (res) => {
    const expirationDate = new Date(
      new Date().getTime() + res.tokenObj.expires_in * 1000
    );
    console.log("Set Item");
    localStorage.setItem("token", res.tokenObj.id_token);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("name", res.profileObj.name);
    localStorage.setItem("imageUrl", res.profileObj.imageUrl);
    dispatch(authSuccess({ token: res.tokenObj.id_token }));
    setTimeout(() => {
      dispatch(logout());
    }, res.tokenObj.expires_in * 1000);
  };

  const handleAuthError = (res) => {
    console.log(res);
    setAuthError(res);
  };

  return (
    <div className={classes.auth}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={authError ? true : false}
        autoHideDuration={6000}
        onClose={() => setAuthError(null)}
        message={"Something went wrong"}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setAuthError(null)}
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
      <GoogleLogin
        clientId={clientId}
        onSuccess={handleAuthSuccess}
        onFailure={handleAuthError}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
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
          
        )}
      />
    </div>
  );
};

export default Auth;

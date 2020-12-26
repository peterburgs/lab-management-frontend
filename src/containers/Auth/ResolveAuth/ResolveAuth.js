import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, getUser } from "../AuthSlice";
import { useHistory } from "react-router-dom";

const ResolveAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
      history.push("/signin");
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      const email = new Date(localStorage.getItem("email"));
      if (expirationDate > new Date()) {
        dispatch(getUser({ email, token, expirationDate }));
      } else {
        dispatch(logout());
        history.push("/signin");
      }
    }
  }, [dispatch, history]);

  return null;
};

export default ResolveAuth;

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
      const expirationDate = new Date(
        localStorage.getItem("expirationDate")
      );
      const email = localStorage.getItem("email");
      const userRole = localStorage.getItem("userRole");
      if (expirationDate > new Date()) {
        console.log("Call getUser ResolveAuth.js");
        dispatch(getUser({ email, token, expirationDate, userRole }));
      } else {
        dispatch(logout());
        history.push("/signin");
      }
    }
  }, [dispatch, history]);

  return null;
};

export default ResolveAuth;

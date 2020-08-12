import { useContext } from "react";
import authContext from "../context/auth/authContext";

const useAuth = () => {
  const AuthState = useContext(authContext);
  const {
    token,
    authenticated,
    user,
    alert_auth,
    userAuthenticate,
    userRegister,
    userLogin,
    userAuth,
    signOff,
    loading,
  } = AuthState;

  return {
    token,
    authenticated,
    user,
    alert_auth,
    userAuthenticate,
    userRegister,
    userLogin,
    userAuth,
    signOff,
    loading,
  };
};
export default useAuth;

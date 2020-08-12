import { useContext } from "react";
import appContenxt from "../context/app/appContenxt";

const useAuth = () => {
  const appState = useContext(appContenxt);
  const {
    alert_app,
    showAlert,
    uploadFile,
    loading,
    createLink,
    url,
    cleanState,
    getPassword,
    getNumDownloads,
  } = appState;

  return {
    alert_app,
    loading,
    showAlert,
    uploadFile,
    createLink,
    url,
    cleanState,
    getPassword,
    getNumDownloads,
  };
};
export default useAuth;

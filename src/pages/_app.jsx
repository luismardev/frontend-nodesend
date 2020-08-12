import React from "react";
import "../assets/styles/index.css";
import AuthState from "../context/auth/authState";
import AppContenxt from "../context/app/appState";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <AppContenxt>
        <Component {...pageProps} />
      </AppContenxt>
    </AuthState>
  );
};
export default MyApp;

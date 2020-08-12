import React, { useEffect } from "react";
import { Header, Footer } from "./";
import { Alert } from "./";
import useAuth from "../hooks/useAuth";
import useApp from "../hooks/useApp";

const Layout = ({ children, showHeader = true, showFooter = true }) => {
  const { alert_auth, userAuth } = useAuth();
  const { alert_app } = useApp();

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <>
      <div className="bg-gray-300 bg">
        {showHeader && <Header />}

        <main>{children}</main>
        {alert_app && <Alert alert={alert_app} />}
        {alert_auth && <Alert alert={alert_auth} />}
        {showFooter && <Footer />}
      </div>
      <style jsx global>{`
        .bg {
          background-image: radial-gradient(#7f9cf5 3px, transparent 1px),
            radial-gradient(#7f9cf5 3px, transparent 1px);
          background-position: 0 0, 25px 25px;
          background-size: 50px 50px;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Layout;

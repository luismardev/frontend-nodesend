import React, { useEffect } from 'react'
import { Header, Footer, Alert } from './'

import useAuth from '../hooks/useAuth'
import useApp from '../hooks/useApp'

const Layout = ({ children, showHeader = true, showFooter = true }) => {
  const { alertAuth, userAuth } = useAuth()
  const { alertApp } = useApp()

  useEffect(() => {
    userAuth()
  }, [])

  return (
    <>
      <div className="bg-gray-300 bg">
        {showHeader && <Header />}

        <main>{children}</main>
        {alertApp && <Alert alert={alertApp} />}
        {alertAuth && <Alert alert={alertAuth} />}
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
  )
}

export default Layout

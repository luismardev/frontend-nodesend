import React from 'react'

const Spinner = () => {
  return (
    <>
      <style jsx>
        {`
          .loader {
            overflow: hidden;
            font-size: 3px;
            position: relative;
            text-indent: -9999em;
            border-top: 1.1em solid rgba(0, 0, 0, 0.5);
            border-right: 1.1em solid rgba(0, 0, 0, 0.5);
            border-bottom: 1.1em solid rgba(0, 0, 0, 0.5);
            border-left: 1.1em solid #000;
            transform: translateZ(0);
            animation: load8 1.1s infinite linear;
          }
          .loader,
          .loader:after {
            border-radius: 50%;
            width: 10em;
            height: 10em;
          }

          @keyframes load8 {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="loader" />
    </>
  )
}

export default Spinner

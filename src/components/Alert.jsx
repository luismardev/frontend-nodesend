import React from "react";

import { IconSuccess, IconError } from "../icons";
const Alert = ({ alert }) => {
  const { msg, type } = alert;
  return (
    <>
      {type === "success" && (
        <div className="fixed bottom-0 right-0 z-50 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md sm:mb-4 sm:mr-4">
          <div className="flex items-center justify-center w-12 bg-green-500">
            <IconSuccess className="w-6 h-6 text-white fill-current" />
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-green-500">Excelente!</span>
              <p className="text-sm text-gray-600">{msg}</p>
            </div>
          </div>
        </div>
      )}
      {type === "error" && (
        <div className="fixed bottom-0 right-0 z-50 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md sm:mb-4 sm:mr-4">
          <div className="flex items-center justify-center w-12 bg-red-500">
            <IconError className="w-6 h-6 text-white fill-current" />
          </div>

          <div className="px-4 py-2 -mx-3">
            <div className="mx-3">
              <span className="font-semibold text-red-500">Error</span>
              <p className="text-sm text-gray-600">{msg}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;

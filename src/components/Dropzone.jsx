import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useApp from "../hooks/useApp";
import useAuth from "../hooks/useAuth";
import { Spinner, Form } from "./";
const Dropzone = () => {
  const { authenticated } = useAuth();

  const { showAlert, uploadFile, loading, createLink } = useApp();
  const [image, setImage] = useState();

  const onDropRejected = () => {
    let message = {};
    if (authenticated) {
      message = {
        msg: "El archivo no puede ser mayor a 10MB",
        type: "error",
      };
    } else {
      message = {
        msg:
          "El archivo no puede ser mayor a 1MB para tener mas almacenamiento cree una cuenta",
        type: "error",
      };
    }

    showAlert(message);
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    //! crear formData
    const formData = new FormData();
    formData.append("records", acceptedFiles[0]);

    if (/(.jpg|.jpeg|.png)$/i.exec(acceptedFiles[0].type)) {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    }

    uploadFile(formData, acceptedFiles[0].path);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: authenticated ? 10000000 : 1000000,
  });

  //! extraer contenido del dropzone
  const records = acceptedFiles.map((arr) => (
    <li
      key={arr.lastModified}
      className="flex flex-1 p-3 mb-4 bg-white rounded shadow-lg"
    >
      {image ? (
        <img className="object-cover w-20 h-20 mr-4" src={image} />
      ) : (
        <div className="w-16 h-16 my-auto mr-4">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}
      <div>
        <p className="text-xl font-bold break-all">{arr.path}</p>
        <p className="text-sm text-gray-500">
          {(arr.size / Math.pow(1024, 2)).toFixed(2)} MB
        </p>
      </div>
    </li>
  ));

  return (
    <div className="flex items-center justify-center h-full px-4 bg-gray-200 border-2 border-gray-400 border-dashed">
      {acceptedFiles.length > 0 ? (
        <>
          <div className="my-32">
            <h4 className="text-2xl font-bold text-center m-b4">Archivo</h4>
            <ul>{records}</ul>
            {authenticated && <Form />}
            {loading ? (
              <span className="flex items-center justify-center">
                <p className="inline-block mr-2 text-lg font-semibold">
                  Subiendo archivo
                </p>
                <Spinner />
              </span>
            ) : (
              <button
                className="w-full px-4 py-2 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0"
                onClick={() => createLink()}
              >
                Crear Enlace
              </button>
            )}
          </div>
        </>
      ) : (
        <div
          {...getRootProps({
            className:
              "dropzone w-full h-full flex items-center justify-center",
          })}
        >
          <input className="h-full" {...getInputProps()} />
          <div className="flex flex-wrap items-center h-full py-32 text-center">
            <div>
              {isDragActive ? (
                <p className="text-2xl text-center text-gray-600">
                  Suelta el archivo
                </p>
              ) : (
                <>
                  <p className="mb-10 text-2xl text-center text-gray-600">
                    Selecciona un archivo y arrastralo aqui
                  </p>
                  <button
                    type="button"
                    className="inline-flex px-4 py-2 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0"
                  >
                    Selecciona archivos para subir
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;

import React, { useState } from "react";
import useApp from "../hooks/useApp";

const Form = () => {
  const [enablePassword, setEnablePassword] = useState(false);
  const { getPassword, getNumDownloads } = useApp();

  return (
    <div className="w-full mt-20">
      <div className="my-2">
        <label htmlFor="selec" className="text-lg text-gray-800 select-none">
          Eliminar luego de:
        </label>
        <select
          onChange={(e) => getNumDownloads(Number(e.target.value))}
          id="selec"
          className="w-full px-4 py-3 pr-8 mt-2 leading-none text-black bg-white border border-gray-400 rounded appearance-none focus:outline-none focus:border-gray-500"
        >
          <option value="" selected disabled>
            -- Seleccione --
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="15">15 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className="flex flex-wrap my-2">
        <label className="text-lg text-gray-800 select-none" htmlFor="check">
          Utilizar contraseña
        </label>
        <input
          id="check"
          className="inline-block ml-4 focus:outline-none"
          type="checkbox"
          onChange={() => setEnablePassword(!enablePassword)}
        />
        <div className="w-full">
          <input
            onChange={(e) => getPassword(e.target.value)}
            placeholder="Contraseña"
            disabled={!enablePassword}
            type="password"
            className={`w-full px-4 py-3 pr-8 mt-2 leading-none text-black border border-gray-400 rounded appearance-none focus:outline-none focus:border-gray-500  placeholder-black ${
              enablePassword ? "bg-white" : "bg-gray-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;

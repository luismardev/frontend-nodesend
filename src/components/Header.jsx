import React from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { capitalize } from "../helper/fuctions";
import { IconArrowRight } from "../icons";
const Header = () => {
  const { authenticated, user, signOff, loading } = useAuth();

  return (
    <header className="text-gray-700 bg-gray-100 shadow-md body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link href="/">
          <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            <img src="/logo.svg" className="w-32 h-10 p-2 text-white" alt="" />
          </a>
        </Link>

        <div className="flex flex-wrap justify-center md:ml-auto">
          {!loading && (
            <>
              {authenticated && user ? (
                <>
                  <p className="w-full mr-4 text-lg font-semibold text-center md:w-auto">
                    {capitalize(user.name)}
                  </p>
                  <button
                    onClick={() => signOff()}
                    className="inline-flex items-center px-3 py-1 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0"
                  >
                    Cerrar Sesion
                  </button>
                </>
              ) : (
                  <>
                    <Link href="/login">
                      <a className="w-full mr-5 text-center md:w-auto hover:text-gray-900">
                        Iniciar sesion
                    </a>
                    </Link>
                    <Link href="/signup">
                      <a className="inline-flex items-center justify-center w-full px-3 py-1 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded md:w-auto focus:outline-none hover:bg-gray-700 md:mt-0">
                        Registrate
                      <IconArrowRight className="w-4 h-4 ml-1 text-white fill-current" />
                      </a>
                    </Link>
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

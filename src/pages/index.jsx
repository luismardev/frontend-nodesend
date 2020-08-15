import React, { useState } from 'react'
import { Layout, Dropzone } from '../components'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import useApp from '../hooks/useApp'
import { IconCheck } from '../icons'
const Index = () => {
  const { authenticated, loading } = useAuth()
  const { url, cleanState } = useApp()

  const [copy, setCopy] = useState(false)

  const copyText = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_APP_FRONTEND_URL}links/${url}`)
    setCopy(true)
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="container flex items-center justify-center my-20 md:w-4/5 xl:w3/5">
          <div className="p-5 py-10 bg-gray-100 rounded-lg lg:flex lg:justify-center md:shadow-lg">
            {url ? (
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-700">
                  Tu enlace es:
                </p>
                <p className="text-2xl font-bold text-black select-all">
                  {`${process.env.NEXT_APP_FRONTEND_URL}links/${url}`}
                </p>
                <button
                  onClick={() => copyText()}
                  className="inline-flex px-3 py-1 mx-2 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-10"
                >
                  {copy ? (
                    <span className="flex items-center">
                      Enlace copiado <IconCheck className="w-6 h-6" />
                    </span>
                  ) : (
                    <span>Copiar enlace</span>
                  )}
                </button>
                <button
                  onClick={() => cleanState()}
                  className="inline-flex px-3 py-1 mx-2 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-10"
                >
                  Subir otro archivo
                </button>
              </div>
            ) : (
              <>
                <div className="mx-2 mb-3 sm:mt-16 md:flex-1 md:mt-0">
                  <Dropzone />
                </div>
                <div className="mx-2 mb-3 sm:mt-16 md:flex-1 md:mt-0">
                  <h2 className="my-4 font-sans text-4xl font-bold text-gray-800">
                      Compartir archivos de forma sencilla y privada
                  </h2>
                  <p className="text-lg leading-loose">
                    <span className="font-bold text-indigo-500">Node Send </span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Earum ipsum minima eligendi numquam sed labore eaque alias
                  rerum quae libero! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Corrupti, laboriosam.
                  </p>
                  {!authenticated && !loading && (
                    <Link href="/signup">
                      <a className="text-lg font-bold text-indigo-500 hover:text-indigo-700">
                          Crea una cuenta para mayores beneficios
                      </a>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index

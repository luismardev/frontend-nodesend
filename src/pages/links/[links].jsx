import React, { useState } from 'react'
import { Layout } from '../../components'
import clientAxios from '../../config/axios'
import useApp from '../../hooks/useApp'

export async function getServerSideProps ({ params: { links } }) {
  const response = await clientAxios.get(`api/links/${links}`)
  return {
    props: {
      data: response.data
    }
  }
}

export async function getServerSidePaths () {
  const url = await clientAxios.get('api/links')

  return {
    paths: url.data.links.map((link) => ({
      params: { links: link.url }
    })),
    fallback: false
  }
}

const Links = ({ data }) => {
  const { showAlert } = useApp()
  const [havePassword, setHavePassword] = useState(data.password)
  const [password, setPassword] = useState('')

  const verifyPassword = async (e) => {
    e.preventDefault()
    try {
      const response = await clientAxios.post(`api/links/${data.url}`, {
        password
      })
      setHavePassword(response.data.password)
    } catch (error) {
      showAlert({ msg: error.response.data.msg, type: 'error' })
    }
  }
  return (
    <Layout>
      <div className="container min-h-screen">
        <div className="max-w-sm p-6 mx-auto mt-20 bg-white rounded-md shadow-md">
          {havePassword ? (
            <>
              <h2 className="text-lg font-semibold text-gray-700 capitalize">
                Este archivo esta protegido
              </h2>

              <form className="clearfix" onSubmit={(e) => verifyPassword(e)}>
                <label className="text-gray-700" htmlFor="password">
                  Contraseña
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-800 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:bg-white"
                />
                <button
                  type="submit"
                  className="inline-block float-right px-3 py-1 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded focus:outline-none hover:bg-gray-700"
                >
                  Enviar
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-4xl text-center text-gray-700">
                  Descarga tu archivo
              </h1>
              <div className="flex items-center justify-center mt-10">
                <a
                  href={`${process.env.backendURL}api/records/${data.file}`}
                  className="inline-flex items-center justify-center w-full px-3 py-1 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded cursor-pointer md:w-auto focus:outline-none hover:bg-gray-700 md:mt-0"
                  download
                >
                    Aqui
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default Links

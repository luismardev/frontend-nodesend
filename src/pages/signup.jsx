import React, { useEffect } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ErrorForm, Layout } from '../components'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { IconHome, IconGoogle } from '../icons'
const Signup = () => {
  const { userRegister, authenticated, alertAuth } = useAuth()

  //! next router
  const router = useRouter()
  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }

    if (alertAuth.type === 'success') {
      router.push('/login')
    }
  }, [authenticated, alertAuth])

  //! formulario y validacion con formik
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: '',
      email: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('el nombre es obligatorio'),
      password: Yup.string()
        .required('la contraseña es obligatoria')
        .min(6, 'la contraseña debe ser minimo de 6 caracteres'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'la contraseña no coincide')
        .required('Campo requerido'),
      email: Yup.string()
        .required('El correo es obligatorio')
        .email('Correo invalido')
    }),
    onSubmit: (data) => {
      const excludeRepeatPassword = ({ repeatPassword, ...rest }) => rest
      const newDate = excludeRepeatPassword(data)
      userRegister(newDate)
    }
  })

  return (
    <Layout showFooter={false} showHeader={false}>
      <div className="flex items-center min-h-screen">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
          <div
            className="hidden bg-center bg-no-repeat bg-contain lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url(undraw_authentication_fsn5.svg)'
            }}
          />

          <div className="relative w-full px-6 py-8 md:px-8 lg:w-1/2">
            <Link href="/">
              <a className="absolute right-0 w-10 h-10 p-2 mr-8 text-white transition duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500">
                <IconHome className="text-white fill-current" />
              </a>
            </Link>
            <div className="">
              <h2 className="text-2xl font-semibold text-center text-gray-700">
                Node Send
              </h2>

              <p className="text-xl text-center text-gray-600">Bienvenido!</p>

              <a
                href={`${process.env.NEXT_APP_BACKEND_URL}api/auth/google`}
                className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
              >
                <div className="px-4 py-3">
                  <IconGoogle className="w-6 h-6" />
                </div>

                <span className="w-5/6 px-4 py-3 font-bold text-center text-gray-600">
                  Iniciar sesion con Google
                </span>
              </a>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b lg:w-1/4" />

              <span className="text-xs text-center text-gray-500 uppercase">
                o
              </span>

              <span className="w-1/5 border-b lg:w-1/4" />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  Nombre y Apellido
                </label>
                <input
                  id="name"
                  className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <ErrorForm error={formik.errors.name} />
                )}
              </div>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Correo Electronico
                </label>
                <input
                  id="email"
                  className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <ErrorForm error={formik.errors.email} />
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                </div>

                <input
                  id="password"
                  className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
                  type="password"
                  autoComplete="on"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <ErrorForm error={formik.errors.password} />
                )}
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="repeatPassword"
                  >
                    Repetir Contraseña
                  </label>
                </div>

                <input
                  id="repeatPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:bg-white"
                  type="password"
                  autoComplete="on"
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.repeatPassword &&
                  formik.errors.repeatPassword && (
                  <ErrorForm error={formik.errors.repeatPassword} />
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-4 text-base text-gray-100 transition duration-300 bg-black border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0"
                >
                  Registrarme
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <Link href="/login">
                <a className="text-xs text-gray-500 uppercase hover:underline">
                  o inicia sesion
                </a>
              </Link>

              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup

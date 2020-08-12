import React, { useReducer } from 'react'
import authContext from './authContext'
import authReducer from './authReducer'
import {
  SUCCESSFUL_REGISTRATION,
  ERROR_REGISTRATION,
  DELETE_ALERT,
  ERROR_LOGIN,
  SUCCESS_LOGIN,
  AUTHENTICATED_USER,
  SIGN_OFF,
  VERIFY_LOGIN,
  INVALID_TOKEN
} from '../types'
import clientAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'
import Cookies from 'js-cookie'

const authState = ({ children }) => {
  const initialState = {
    token: typeof window !== 'undefined' ? Cookies.get('token') : '',
    authenticated: null,
    user: null,
    alertAuth: {
      msg: null,
      type: null
    },
    loading: true
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  //! funciones

  const userRegister = async (data) => {
    try {
      const response = await clientAxios.post('api/users', data)
      dispatch({
        type: SUCCESSFUL_REGISTRATION,
        payload: {
          msg: response.data.msg,
          type: 'success'
        }
      })
      deleteAlert()
    } catch (error) {
      dispatch({
        type: ERROR_REGISTRATION,
        payload: {
          msg: error.response.data.msg,
          type: 'error'
        }
      })
      deleteAlert()
    }
  }

  const userLogin = async (data) => {
    try {
      const response = await clientAxios.post('api/auth', {}, {
        auth: {
          username: data.email,
          password: data.password
        }
      })
      dispatch({
        type: SUCCESS_LOGIN,
        payload: response.data.token
      })
    } catch (error) {
      dispatch({
        type: ERROR_LOGIN,
        payload: {
          msg: error.response.data.msg,
          type: 'error'
        }
      })
      deleteAlert()
    }
  }

  const userAuth = async () => {
    const token = Cookies.get('token')

    if (token) {
      tokenAuth(token)
      try {
        const response = await clientAxios.get('api/auth')
        dispatch({
          type: AUTHENTICATED_USER,
          payload: response.data.user
        })
        loading(false)
      } catch (error) {
        dispatch({
          type: INVALID_TOKEN
        })
        loading(false)
      }
    } else {
      loading(false)
    }
  }

  const signOff = () => {
    dispatch({
      type: SIGN_OFF
    })
  }

  const deleteAlert = () => {
    setTimeout(() => {
      dispatch({
        type: DELETE_ALERT
      })
    }, 3000)
  }

  const loading = (value) => {
    dispatch({
      type: VERIFY_LOGIN,
      payload: value
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        alertAuth: state.alertAuth,
        loading: state.loading,
        userRegister,
        userLogin,
        userAuth,
        signOff
      }}
    >
      {children}
    </authContext.Provider>
  )
}
export default authState

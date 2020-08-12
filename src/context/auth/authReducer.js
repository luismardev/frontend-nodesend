import Cookies from 'js-cookie'

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

const authReducer = (state, action) => {
  switch (action.type) {
    case ERROR_LOGIN:
    case ERROR_REGISTRATION:
    case SUCCESSFUL_REGISTRATION:
      return {
        ...state,
        alertAuth: action.payload
      }
    case SUCCESS_LOGIN:
      Cookies.set('token', action.payload)
      return {
        ...state,
        token: action.payload.token,
        authenticated: true
      }
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      }
    case INVALID_TOKEN:
    case SIGN_OFF:
      Cookies.remove('token')
      return {
        ...state,
        user: null,
        token: '',
        authenticated: null
      }
    case VERIFY_LOGIN:
      return {
        ...state,
        loading: action.payload
      }
    case DELETE_ALERT:
      return {
        ...state,
        alertAuth: {
          msg: null,
          type: null
        }
      }
    default:
      return state
  }
}
export default authReducer

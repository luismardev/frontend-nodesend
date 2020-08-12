import { useContext } from 'react'
import authContext from '../context/auth/authContext'

const useAuth = () => {
  const AuthState = useContext(authContext)
  const {
    token,
    authenticated,
    user,
    alertAuth,
    userAuthenticate,
    userRegister,
    userLogin,
    userAuth,
    signOff,
    loading
  } = AuthState

  return {
    token,
    authenticated,
    user,
    alertAuth,
    userAuthenticate,
    userRegister,
    userLogin,
    userAuth,
    signOff,
    loading
  }
}
export default useAuth

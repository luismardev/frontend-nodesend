import { useContext } from 'react'
import appContenxt from '../context/app/appContenxt'

const useAuth = () => {
  const appState = useContext(appContenxt)
  const {
    alertApp,
    showAlert,
    uploadFile,
    loading,
    createLink,
    url,
    cleanState,
    getPassword,
    getNumDownloads
  } = appState

  return {
    alertApp,
    loading,
    showAlert,
    uploadFile,
    createLink,
    url,
    cleanState,
    getPassword,
    getNumDownloads
  }
}
export default useAuth

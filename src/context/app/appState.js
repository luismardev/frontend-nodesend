import React, { useReducer } from 'react'
import clientAxios from '../../config/axios'
import appContenxt from './appContenxt'
import appReducer from './appReducer'
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_SUCCESS_LINK,
  CREATE_ERROR_LINK,
  DELETE_ALERT,
  SHOW_ALERT,
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_NUM_DOWNLOADS
} from '../types'

const appState = ({ children }) => {
  const initialState = {
    alertApp: {
      msg: null,
      type: null
    },
    originalName: '',
    name: '',
    loading: null,
    downloads: 1,
    password: '',
    author: null,
    url: ''
  }
  const [state, dispatch] = useReducer(appReducer, initialState)

  const uploadFile = async (formData, originalName) => {
    dispatch({
      type: UPLOAD_FILE,
      payload: true
    })
    try {
      const response = await clientAxios.post('api/records', formData)
      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: {
          name: response.data.file,
          originalName: originalName
        }
      })
    } catch (error) {
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: error.response.data.msg
      })
    }
  }

  const createLink = async () => {
    const data = {
      name: state.name,
      originalName: state.originalName,
      downloads: state.downloads,
      password: state.password,
      author: state.author
    }
    try {
      const response = await clientAxios.post('api/links', data)
      dispatch({
        type: CREATE_SUCCESS_LINK,
        payload: response.data.msg
      })
    } catch (error) {
      dispatch({
        type: CREATE_ERROR_LINK,
        payload: error.response.data.msg
      })
    }
  }

  const showAlert = ({ msg, type }) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        type
      }
    })
    deleteAlert()
  }

  const deleteAlert = () => {
    setTimeout(() => {
      dispatch({
        type: DELETE_ALERT
      })
    }, 3000)
  }

  const cleanState = () => {
    dispatch({
      type: CLEAN_STATE
    })
  }

  const getPassword = (password) => {
    dispatch({
      type: ADD_PASSWORD,
      payload: password
    })
  }

  const getNumDownloads = (downloads) => {
    dispatch({
      type: ADD_NUM_DOWNLOADS,
      payload: downloads
    })
  }
  return (
    <appContenxt.Provider
      value={{
        alertApp: state.alertApp,
        loading: state.loading,
        url: state.url,
        showAlert,
        uploadFile,
        createLink,
        cleanState,
        getPassword,
        getNumDownloads
      }}
    >
      {children}
    </appContenxt.Provider>
  )
}

export default appState

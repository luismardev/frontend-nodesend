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
  ADD_NUM_DOWNLOADS,
} from "../types";

const appReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: action.payload,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        original_name: action.payload.original_name,
        loading: null,
      };
    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        alert_app: action.payload,
        loading: null,
      };
    case CREATE_SUCCESS_LINK:
      return {
        ...state,
        url: action.payload,
      };
    case ADD_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case ADD_NUM_DOWNLOADS:
      return {
        ...state,
        downloads: action.payload,
      };
    case CLEAN_STATE:
      return {
        ...state,
        alert_app: {
          msg: null,
          type: null,
        },
        original_name: "",
        name: "",
        downloads: 1,
        password: "",
        author: null,
        url: "",
      };
    case CREATE_ERROR_LINK:
    case SHOW_ALERT:
      return {
        ...state,
        alert_app: action.payload,
      };
    case DELETE_ALERT:
      return {
        ...state,
        alert_app: {
          msg: null,
          type: null,
        },
      };
    default:
      return state;
  }
};
export default appReducer;

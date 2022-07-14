import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHANGE_USERNAME_ERROR,
  CHANGE_USERNAME_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  LOGOUT_USER,
  CLEAR_ALERT,
} from '../actions/userTypes';

const user = localStorage.getItem('user');

const initialState = {
  user: user ? JSON.parse(user).name : null,
  showLoginAlert: false,
  loginAlert: '',
  showRegisterAlert: false,
  registerAlert: '',
  changeAlert: true,
  changeAlertText: '',
  img: '',
  showImgAlert: false,
  imgAlertText: '',
  passAlertSuccess: '',
  showPassAlertSuccess: false,
  passAlertError: '',
  showPassAlertError: false,

};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        showRegisterAlert: false,
        registerAlert: '',
        user: action.payload.name,
        img: action.payload.img,

      };
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        showRegisterAlert: true,
        registerAlert: action.payload.msg,
        user: null,
      };
    }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        showLoginAlert: false,
        loginAlert: '',
        user: action.payload.name,
        img: action.payload.img,
      };
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        showLoginAlert: true,
        loginAlert: action.payload.msg,
        user: null,
      };
    }
    case CHANGE_USERNAME_SUCCESS:
      return {
        ...state,
        user: action.payload,
        changeAlert: false,
        changeAlertText: '',
      };
    case CHANGE_USERNAME_ERROR:
      return {
        ...state,
        changeAlert: true,
        changeAlertText: action.payload.msg,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        img: action.payload,
        showImgAlert: false,
        imgAlertText: '',
      };
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        showImgAlert: true,
        imgAlertText: action.payload.msg,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        showPassAlertSuccess: true,
        passAlertSuccess: action.payload.success,
        showPassAlertError: false,
        passAlertError: '',
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        showPassAlertError: true,
        passAlertError: action.payload.err,
        showPassAlertSuccess: false,
        passAlertSuccess: '',

      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        showlert: false,
        alertText: '',
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showLoginAlert: false,
        loginAlert: '',
        showRegisterAlert: false,
        registerAlert: '',
      };
    default:
      return state;
  }
};

export default userReducer;

import axios from 'axios';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHANGE_USERNAME_SUCCESS,
  CHANGE_USERNAME_ERROR,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  LOGOUT_USER,
} from './userTypes';

import '../../axios';
import imageAPI from '../../customaxios';
import { showAlert } from './alertActions';

// pure action creators

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const registerUserError = (error) => ({
  type: REGISTER_USER_ERROR,
  payload: error,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserError = (error) => ({
  type: LOGIN_USER_ERROR,
  payload: error,
});

export const changeUsernameSuccess = (updatedUsername) => ({
  type: CHANGE_USERNAME_SUCCESS,
  payload: updatedUsername,
});

export const changeUsernameError = (error) => ({
  type: CHANGE_USERNAME_ERROR,
  payload: error,
});

export const uploadImageSuccess = (image) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: image,
});

export const uploadImageError = (error) => ({
  type: UPLOAD_IMAGE_ERROR,
  payload: error,
});
export const logout = () => ({
  type: LOGOUT_USER,
});

export const changePasswordSuccess = (success) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: success,
});

export const changePasswordError = (error) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: error,
});

// async action creators

export const registerUser = (userInput) => (dispatch) => axios
  .post('/api/v1/auth/register', { ...userInput })
  .then((response) => {
    const { token, user } = response.data;
    dispatch(
      registerUserSuccess({ name: user.name, img: user.selectedFile }),
    );
    localStorage.setItem(
      'user',
      JSON.stringify({
        token,
        name: user.name,
        id: user.id,
        image: user.img,
      }),
    );
  })

  .catch((error) => {
    console.log(error);
    dispatch(registerUserError({ msg: error.response?.data.msg }));
    dispatch(showAlert());
  });

export const loginUser = (userInput) => (dispatch) => axios
  .post('/api/v1/auth/login', { ...userInput })
  .then((response) => {
    const { token, user } = response.data;
    dispatch(loginUserSuccess({ name: user.name, img: user.selectedFile }));
    localStorage.setItem(
      'user',
      JSON.stringify({
        token,
        name: user.name,
        id: user.id,
        image: user.img,
      }),
    );
  })
  .catch((error) => {
    dispatch(loginUserError({ msg: error.response?.data.msg }));
    dispatch(showAlert());
  });

export const changeUsername = (id, value) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/v1/auth/${id}/changeUsername`, {
      value,
    });
    dispatch(changeUsernameSuccess(data));
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedLocalData = { ...user, name: data };
    localStorage.setItem('user', JSON.stringify(updatedLocalData));
    return data;
  } catch (err) {
    dispatch(changeUsernameError({ msg: err.response.data.msg }));
    dispatch(showAlert());
  }
};
export const uploadImage = (id, value) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/v1/auth/${id}/uploadImage`, value);
    const imageStatic = await imageAPI.get(`http://localhost:5000/${data.imgName}`);
    dispatch(uploadImageSuccess(imageStatic.data));
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedData = { ...user, image: imageStatic.data };
    localStorage.setItem('user', JSON.stringify(updatedData));
    return imageStatic.data;
  } catch (err) {
    dispatch(uploadImageError({ msg: err.response?.data?.msg }));
    dispatch(showAlert());
  }
};

export const updatePassword = (id, value) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/v1/auth/${id}/updatePassword`, value);
    dispatch(changePasswordSuccess({ success: data.msg }));
    dispatch(showAlert());
    return { success: data.msg };
  } catch (err) {
    dispatch(changePasswordError({ err: err.response.data.msg }));
    dispatch(showAlert());
  }
};

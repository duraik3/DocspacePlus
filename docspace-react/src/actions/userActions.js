/**
 *
 */
import Axios from "axios";

export function fetchUser() {
  return (dispatch) => {
    dispatch(fetchUserBegin());
    Axios.get("/api/user/current")
      .then((response) => {
        dispatch(fetchUserSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          dispatch(loggedOutUser());
        } else {
          dispatch(fetchUserError(error));
          throw Error(error);
        }
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    Axios.post("/api/user/logout")
      .then((response) => {
        dispatch(processLogout());
      })
      .catch((error) => {
        console.log("error logout");
      });
  };
}

export const FETCH_USER_BEGIN = "FETCH_USER_BEGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const UPDATE_USER = "UPDATE_USER";
export const PROCESS_LOGGED_OUT = "PROCESS_LOGGED_OUT";
export const USER_LOGGED_OUT = "LOGGED_OUT";
export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";
export const OPEN_REGISTER_MODAL = "OPEN_REGISTER_MODAL";
export const CLOSE_REGISTER_MODAL = "CLOSE_REGISTER_MODAL";
export const OPEN_CONFIRM_REGISTER = "OPEN_CONFIRM_REGISTER";
export const CLOSE_CONFIRM_REGISTER = "CLOSE_CONFIRM_REGISTER";
export const OPEN_FORGOT_PASSWORD_MODAL = "OPEN_FORGOT_PASSWORD_MODAL";
export const CLOSE_FORGOT_PASSWORD_MODAL = "CLOSE_FORGOT_PASSWORD_MODAL";

export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: { user },
});

export const fetchUserError = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: { error },
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const loggedOutUser = () => ({
  type: USER_LOGGED_OUT,
});

export const processLogout = () => ({
  type: PROCESS_LOGGED_OUT,
});

export const openLogin = () => ({
  type: OPEN_LOGIN_MODAL,
});
export const closeLogin = () => ({
  type: CLOSE_LOGIN_MODAL,
});

export const openRegister = () => ({
  type: OPEN_REGISTER_MODAL,
});
export const closeRegister = () => ({
  type: CLOSE_REGISTER_MODAL,
});

export const openConfirmRegister = () => ({
  type: OPEN_CONFIRM_REGISTER,
});
export const closeConfirmRegister = () => ({
  type: CLOSE_CONFIRM_REGISTER,
});
export const openForgotPassword = () => ({
  type: OPEN_FORGOT_PASSWORD_MODAL,
});
export const closeForgotPassword = () => ({
  type: CLOSE_FORGOT_PASSWORD_MODAL,
});

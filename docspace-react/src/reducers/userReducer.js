/**
 *
 */
import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  USER_LOGGED_OUT,
  PROCESS_LOGGED_OUT,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  CLOSE_REGISTER_MODAL,
  OPEN_CONFIRM_REGISTER,
  CLOSE_CONFIRM_REGISTER,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
} from "../actions/userActions";

const initialState = {
  showLogin: false,
  showRegister: false,
  showConfirmRegister: false,
  showForgotPassword: false,
  user: null,
  loading: false,
  loggedOut: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: null,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        loggedOut: true,
      };
    case PROCESS_LOGGED_OUT:
      return {
        ...state,
        loggedOut: true,
        loading: false,
        user: null,
      };
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        showLogin: true,
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        showLogin: false,
      };
    case OPEN_REGISTER_MODAL:
      return {
        ...state,
        showLogin: false,
        showRegister: true,
      };
    case CLOSE_REGISTER_MODAL:
      return {
        ...state,
        showRegister: false,
      };
    case OPEN_CONFIRM_REGISTER:
      return {
        ...state,
        showConfirmRegister: true,
      };
    case CLOSE_CONFIRM_REGISTER:
      return {
        ...state,
        showConfirmRegister: false,
      };
    case OPEN_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        showLogin: false,
        showForgotPassword: true,
      };
    case CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        showForgotPassword: false,
      };
    default:
      return state;
  }
}

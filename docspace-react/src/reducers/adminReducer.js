import {SET_ADMIN_SCREEN} from "../actions/adminActions";

/**
 *
 */
const initialState = {
  adminScreen: ""
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADMIN_SCREEN:
      return {
        ...state,
        adminScreen : action.payload.screen,
      };
    default:
      return state;
  }
}

/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @author: smartData
 */

import * as TYPE from "../../actions/constants";

/******** Reducers ********/
const initialState = {
  data: null,
  loggedIn: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.LOGIN_USERS:
      return { ...state, data: action.data, isFetching: false, loggedIn: true };
    case TYPE.REGISTER_USERS:
      return { ...state, loggedIn: false };
    case TYPE.LOGOUT_USERS:
      return initialState;
    default:
      return state;
  }
}

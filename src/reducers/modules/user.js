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
    case TYPE.LOGIN_SUCCESS:
      return { ...state, data: action.data, isFetching: false, loggedIn: true };
    case TYPE.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}

/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @author: smartData
 */

import * as TYPE from "../../actions/constants";

/******** Reducers ********/
const initialState = {
  data: {},
  userBids: [],
  userDetails: {},
  cards: [],
  loggedIn: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.LOGIN_USERS:
      return {
        ...state,
        data: action.data.data,
        isFetching: false,
        loggedIn: true
      };
    case TYPE.REGISTER_USERS:
      return { ...state, loggedIn: false };
    case TYPE.LOGOUT_USERS:
      return initialState;
    case TYPE.USER_BID_LISTING:
      return { ...state, userBids: action.data };
    case TYPE.GET_USER_DETAILS:
      return { ...state, userDetails: action.data };
    case TYPE.USER_CARDS:
      return { ...state, cards: action.data };
    case TYPE.UPDATE_USER_DETAILS:
      return { ...state, userDetails: action.data };
    case TYPE.UPDATE_USER_PROFILE:
      return { ...state };
    case TYPE.UPDATE_USER_IMAGE:
      console.log("action.data: ", action.data);

      return {
        ...state,
        data: { ...state.data, image: action.data.image },
        userDetails: { ...state.userDetails, image: action.data.image }
      };
    default:
      return state;
  }
}

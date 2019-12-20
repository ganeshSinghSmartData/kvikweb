/*
 * @file: messages.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @author: smartData
 */

import * as TYPE from "../../actions/constants";

/******** Reducers ********/
const initialState = {
  about_us_details: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.ABOUT_US:
      return { ...state, about_us_details: action.data };
    default:
      return state;
  }
}

/*
 * @file: loader.js
 * @description: Reducers and actions for store/manipulate loader  status
 * @author: smartData
 */

import * as TYPE from "../../actions/constants";

/******** Reducers ********/
const initialState = {
  isFetching: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.IS_FETCHING:
      return { ...state, isFetching: action.status };
    default:
      return state;
  }
}

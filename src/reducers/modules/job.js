/*
 * @file: home.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @author: smartData
 */

import * as TYPE from "../../actions/constants";

/******** Reducers ********/
const initialState = {
  jobProduct: [],
  jobDetails: {},
  count: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_JOB_PRODUCTS:
      return {
        ...state,
        jobProduct: action.data.joblisting,
        count: action.data.count
      };
    case TYPE.GET_JOB_DETAILS:
      return {
        ...state,
        jobDetails: action.data
      };
    default:
      return state;
  }
}

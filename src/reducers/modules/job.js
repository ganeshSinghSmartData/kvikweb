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
  activeJobProduct: [],
  completedJobProduct: [],
  count: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_JOB_PRODUCTS:
      return {
        ...state,
        jobProduct: [...state.jobProduct, ...action.data.joblisting],
        count: action.data.count
      };
    case TYPE.GET_JOB_DETAILS:
      return {
        ...state,
        jobDetails: action.data
      };
    case TYPE.GET_ACTIVE_JOB:
      return {
        ...state,
        activeJobProduct: action.data
      };

    case TYPE.GET_COMPLETED_JOB:
      return {
        ...state,
        completedJobProduct: action.data
      };
    case TYPE.POST_JOB_PRODUCTS:
      return state;
    case TYPE.RESET_JOB_PRODUCTS:
      return { ...state, jobProduct: [] };
    default:
      return state;
  }
}

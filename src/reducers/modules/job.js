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
  count: 0,
  activeJobsCount: 0,
  completedJobsCount: 0,
  sidebarToggle: false
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
        activeJobProduct: [...state.activeJobProduct, ...action.data.data],
        activeJobsCount: action.data.count
      };

    case TYPE.GET_CATEGORY:
      return { ...state, category: action.data };

    case TYPE.GET_COMPLETED_JOB:
      return {
        ...state,
        completedJobProduct: [
          ...state.completedJobProduct,
          ...action.data.data
        ],
        completedJobsCount: action.data.count
      };

    case TYPE.SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarToggle: action.data
      };

    case TYPE.POST_JOB_PRODUCTS:
      return state;
    case TYPE.RESET_JOB_PRODUCTS:
      return { ...state, jobProduct: [] };
    case TYPE.RESET_ACTIVE_JOB:
      return { ...state, activeJobProduct: [] };
    case TYPE.RESET_COMPLETED_JOB:
      return { ...state, completedJobProduct: [] };
    case TYPE.RESET_JOB_DETAILS:
      return { ...state, jobDetails: {} };
    default:
      return state;
  }
}

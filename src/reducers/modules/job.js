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
  sidebarToggle: false,
  filter: {},
  filterToggle: false,
  similarProducts: [],
  similarCount: 0,
  footerToggle: false,
  jobBidCheck: []
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
    case TYPE.GET_JOB_BID_CHECK:
      return {
        ...state,
        jobBidCheck: action.data
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
    case TYPE.FOOTER_IN_VIEW:
      return {
        ...state,
        footerToggle: action.data
      };
    case TYPE.SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarToggle: action.data
      };
    case TYPE.FILTER_TOGGLE:
      return {
        ...state,
        filterToggle: action.data
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
    case TYPE.FILTER_SUCCESS:
      return { ...state, filter: action.payload };
    case TYPE.SIMILAR_JOBS:
      return {
        ...state,
        similarProducts: [...state.similarProducts, ...action.data.joblisting],
        similarCount: action.data.count
      };
    case TYPE.CLEAR_SIMILAR_JOBS:
      return {
        ...state,
        similarProducts: [],
        similarCount: 0
      };
    case TYPE.LOGOUT_USERS:
      return initialState;
    default:
      return state;
  }
}

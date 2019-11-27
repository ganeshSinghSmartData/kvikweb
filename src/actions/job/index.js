import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
// import { toastAction, toastErrorAction } from "../toast-actions";

export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });
export const is_search = status => ({ type: TYPE.IS_STATUS, status });
export const get_job_products = data => ({ type: TYPE.GET_JOB_PRODUCTS, data });
export const get_job_details = data => ({ type: TYPE.GET_JOB_DETAILS, data });

/****** action creator for get jobs ********/
export const getJobProduct = params => {
  return (dispatch, getState) => {
    /* const {
      data: { loginToken }
    } = getState().user; */
    ApiClient.get(`${apiUrl}/api/job_listing`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_job_products(response));
      } else if (response.status === 401) {
        console.log("errror with 401 : ");
        // toastErrorAction(dispatch, response.message);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for get jobs ********/
export const getJobDetails = job_id => {
  return (dispatch, getState) => {
    /* const {
      data: { loginToken }
    } = getState().user; */
    ApiClient.get(`${apiUrl}/api/job_detail/${job_id}`, {}).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_job_details(response.data));
      } else if (response.status === 401) {
        console.log("errror with 401 : ");
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

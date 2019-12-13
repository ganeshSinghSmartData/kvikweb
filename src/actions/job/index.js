import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction, toastErrorAction } from "../toast-actions";
import { pagination } from "../../utilities/constants";

export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });
export const is_search = status => ({ type: TYPE.IS_STATUS, status });
export const get_job_products = data => ({ type: TYPE.GET_JOB_PRODUCTS, data });
export const reset_job_products = () => ({ type: TYPE.RESET_JOB_PRODUCTS });
export const get_job_details = data => ({ type: TYPE.GET_JOB_DETAILS, data });
export const post_job_products = data => ({ type: TYPE.POST_JOB_PRODUCTS, data });
export const get_active_job = data => ({ type: TYPE.GET_ACTIVE_JOB, data });
export const get_completed_job = data => ({ type: TYPE.GET_COMPLETED_JOB, data });

/****** action creator for get jobs ********/
export const getJobProduct = ({
  page,
  search = "",
  long = "",
  lat = "",
  category = ""
}) => {
  return (dispatch, getState) => {
    const skip = (page - 1) * pagination.limit;
    ApiClient.get(
      `${apiUrl}/api/job_listing?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${pagination.limit}&search=${search}`,
      {}
    ).then(response => {
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
export const getJobDetails = (job_id) => {
  return (dispatch, getState) => {
    /* const {
      data: { token }
    } = getState().user; */
    ApiClient.get(`${apiUrl}/api/job_detail/${job_id}`, {}).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_job_details(response.data));
      } else if (response.status === 404) {
        toastAction(false, response.msg);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for get jobs ********/
export const createNewJob = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient._postFormData(`${apiUrl}/api/add_job`, params, token).then(
      response => {
        if (response.status === 200) {
          dispatch(is_fetching(false));
          dispatch(post_job_products(response.data));
          toastAction(true, response.msg);
          callback(true);
        } else if (response.status === 401) {
          callback(false);
          console.log("errror with 401 : ");
        } else {
          dispatch(is_fetching(false));
          callback(false);
        }
      }
    );
  };
};

/****** action creator for post bid for job ********/
export const placeYourBid = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.post(`${apiUrl}/bid/post_bid`, params, token).then(
      response => {
        if (response.status === 200) {
          dispatch(is_fetching(false));
          // dispatch(post_job_products(response.data));
          toastAction(true, response.msg);
          callback(true);
        } else if (response.status === 401) {
          callback(false);
          console.log("errror with 401 : ");
        } else {
          dispatch(is_fetching(false));
          callback(false);
        }
      }
    );
  };
}

/****** action creator for list users active job ********/
export const getUserActiveJob = ({
  page,
  search = "",
  long = "",
  lat = "",
  category = ""
}) => {
  return (dispatch, getState) => {
    const skip = (page - 1) * pagination.limit;
    const {
      data: { token }
    } = getState().user;

    ApiClient.get(
      `${apiUrl}/api/user_active_job?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${pagination.limit}&search=${search}`,
      {}, token
    ).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_active_job(response.data));
      } else if (response.status === 401) {
        console.log("errror with 401 : ");
        // toastErrorAction(dispatch, response.message);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
}

/****** action creator for list users cpmpleted job ********/
export const getUserCompletedJob = ({
  page,
  search = "",
  long = "",
  lat = "",
  category = ""
}) => {
  return (dispatch, getState) => {
    const skip = (page - 1) * pagination.limit;
    const {
      data: { token }
    } = getState().user;
    ApiClient.get(
      `${apiUrl}/api/user_completed_job?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${pagination.limit}&search=${search}`,
      {}, token
    ).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_completed_job(response.data));
      } else if (response.status === 401) {
        console.log("errror with 401 : ");
        // toastErrorAction(dispatch, response.message);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
}
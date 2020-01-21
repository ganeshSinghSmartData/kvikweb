import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction, toastErrorAction } from "../toast-actions";
import { pagination } from "../../utilities/constants";

export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });
export const is_search = status => ({ type: TYPE.IS_STATUS, status });
export const get_job_products = data => ({ type: TYPE.GET_JOB_PRODUCTS, data });
export const reset_job_products = () => ({ type: TYPE.RESET_JOB_PRODUCTS });
export const reset_active_job = () => ({ type: TYPE.RESET_ACTIVE_JOB });
export const reset_completed_job = () => ({ type: TYPE.RESET_COMPLETED_JOB });
export const get_job_details = data => ({ type: TYPE.GET_JOB_DETAILS, data });
export const get_job_bid_check = data => ({ type: TYPE.GET_JOB_BID_CHECK, data });
export const get_category = data => ({ type: TYPE.GET_CATEGORY, data });
export const post_job_products = data => ({
  type: TYPE.POST_JOB_PRODUCTS,
  data
});
export const get_active_job = data => ({ type: TYPE.GET_ACTIVE_JOB, data });
export const get_completed_job = data => ({
  type: TYPE.GET_COMPLETED_JOB,
  data
});
export const reset_job_details = data => ({
  type: TYPE.RESET_JOB_DETAILS,
  data
});
export const approved_bid_work = data => ({
  type: TYPE.APPROVED_BID_WORK,
  data
});

/****** action creator for get categories ********/
export const getJobCategory = () => {
  return dispatch => {
    ApiClient.get(`${apiUrl}/categories`, {}).then(response => {
      if (response.status === 200) {
        dispatch(get_category(response.data));
      } else if (response.status === 404) {
        toastAction(false, response.msg);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for get jobs ********/
export const getJobProduct = ({
  page,
  budget = "",
  search = "",
  zip_code = "",
  miles = "",
  long = "",
  lat = "",
  category = [],
  sort = ""
}) => {
  return dispatch => {
    const skip = (page - 1) * pagination.limit;
    ApiClient.get(
      `${apiUrl}/api/job_listing?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${
      pagination.limit
      }&budget=${budget}&zip_code=${zip_code}&miles=${miles}&search=${
      search ? (search.search ? search.search : "") : ""
      }&sort=${JSON.stringify(sort)}`,
      {}
    ).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_job_products(response));
      } else if (response.status === 401) {
        // toastErrorAction(dispatch, response.message);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for get jobs ********/
export const getJobDetails = job_id => {
  return dispatch => {
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

/****** action creator for job bid check ********/
export const getJobBidCheck = job_id => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.get(`${apiUrl}/bid/check_user_bid/${job_id}`, {}, token).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_job_bid_check(response.data));
      } else if (response.status === 404) {
        toastAction(false, response.msg);
      } else {
        dispatch(is_fetching(false));
        dispatch(get_job_bid_check(response.data));
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
        } else if (response.status === 402) {
          toastAction(false, response.msg);
          callback(false);
        } else {
          callback(false);
          toastErrorAction(dispatch, response.msg);
        }
      }
    );
  };
};

export const updateExistingJob = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient._putFormData(`${apiUrl}/api/job_update`, params, token).then(
      response => {
        if (response.status === 200) {
          dispatch(is_fetching(false));
          dispatch(post_job_products(response.data));
          toastAction(true, response.msg);
          callback(true);
        } else if (response.status === 401) {
          callback(false);
        } else {
          callback(false);
          toastErrorAction(dispatch, response.msg);
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
    ApiClient.post(`${apiUrl}/bid/post_bid`, params, token).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        // dispatch(post_job_products(response.data));
        toastAction(true, response.msg);
        callback(true);
      } else if (response.status === 402) {
        callback(false);
        toastAction(false, response.msg);
      } else {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      }
    });
  };
};

/****** action creator for list users active job ********/
export const getUserActiveJob = (
  { page, search = "", long = "", lat = "", category = "" },
  callback
) => {
  return (dispatch, getState) => {
    const skip = (page - 1) * pagination.limit;
    const {
      data: { token }
    } = getState().user;
    ApiClient.get(
      `${apiUrl}/api/user_active_job?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${pagination.limit}&search=${search}`,
      {},
      token
    ).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_active_job(response));
        callback(true);
      } else if (response.status === 401) {
        callback(false);
        // toastErrorAction(dispatch, response.message);
      } else {
        callback(false);
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for list users cpmpleted job ********/
export const getUserCompletedJob = (
  { page, search = "", long = "", lat = "", category = "" },
  callback
) => {
  return (dispatch, getState) => {
    const skip = (page - 1) * pagination.limit;
    const {
      data: { token }
    } = getState().user;
    ApiClient.get(
      `${apiUrl}/api/user_completed_job?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${pagination.limit}&search=${search}`,
      {},
      token
    ).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(get_completed_job(response));
        callback(true);
      } else if (response.status === 401) {
        // toastErrorAction(dispatch, response.message);
        callback(false);
      } else {
        dispatch(is_fetching(false));
        callback(false);
      }
    });
  };
};

/****** action creator for list users cpmpleted job ********/
export const approvedBidWork = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.post(`${apiUrl}/bid/approved_bid_work`, params, token).then(
      response => {
        if (response.status === 200) {
          callback(true);
          toastAction(true, response.msg);
        } else if (response.status == 402) {
          callback(false);
          toastAction(false, response.msg);
        } else {
          toastErrorAction(dispatch, response.msg);
        }
      }
    );
  };
};

/****** action creator for list users cpmpleted job ********/
export const deleteMyJob = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.delete(`${apiUrl}/api/delete_job/${params.job_id}`, token).then(
      response => {
        if (response.status === 200) {
          toastAction(true, response.msg);
          callback(true);
        } else if (response.status === 401) {
          callback(false);
          toastAction(false, response.msg);
        } else {
          toastErrorAction(dispatch, response.msg);
        }
      }
    );
  };
};

/****** action creator to add commente to the Bidder ********/
export const addBidderReview = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.post(`${apiUrl}/reviews/post_review`, params, token).then(
      response => {
        if (response.status === 200) {
          toastAction(true, response.msg);
          callback(true);
        } else if (response.status === 401) {
          toastAction(false, response.msg);
          callback(false);
        } else {
          dispatch(is_fetching(false));
        }
      }
    );
  };
};

/****** action creator for Sidebar Toggle ********/

export const sidebarToggleHandler = (data) => (
  { type: TYPE.SIDEBAR_TOGGLE, data }
);


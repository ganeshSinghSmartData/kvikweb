import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction, toastErrorAction } from "../toast-actions";
import { pagination } from "../../utilities/constants";
import { is_fetching } from "../job";

export const bid_list = (data) => ({ type: TYPE.BID_LIST, data });
export const bid_details = (data) => ({ type: TYPE.BID_DETAILS, data });
export const get_active_bid = (data) => ({ type: TYPE.GET_ACTIVE_BID, data });
export const get_completed_bid = (data) => ({
  type: TYPE.GET_COMPLETED_BID,
  data
});
export const user_job_details = (data) => ({
  type: TYPE.USER_JOB_DETAILS,
  data
});
export const reset_user_job_details = () => ({
  type: TYPE.RESET_USER_JOB_DETAILS
});

export const start_bid_work = (data) => ({ type: TYPE.START_BID_WORK, data });
export const end_bid_work = (data) => ({ type: TYPE.END_BID_WORK, data });

/****** action creator for register users ********/
export const getBidList = (params, callback) => {
  return (dispatch) => {
    ApiClient.post(`${apiUrl}/register`, params).then((response) => {
      if (response.status === 200) {
        dispatch(bid_list(response));
        callback(true);
      } else {
        toastErrorAction(dispatch, response.msg);
        callback(false);
      }
    });
  };
};

/****** action creator for register users ********/
export const getUserBidDetails = (params, callback) => {
  return (dispatch) => {
    ApiClient.post(`${apiUrl}/bid/user_job_detail`, params).then((response) => {
      if (response.status === 200) {
        dispatch(bid_details(response));
        callback(true);
      } else {
        toastErrorAction(dispatch, response.msg);
        callback(false);
      }
    });
  };
};

/****** action creator for list users cpmpleted bid ********/
export const getUserCompletedBid = (
  { page, search = "", long = "", lat = "", category = "" },
  callback
) => {
  return (dispatch, getState) => {
    const skip = (page - 1) * pagination.limit;
    const {
      data: { token }
    } = getState().user;
    ApiClient.get(
      `${apiUrl}/api/user_completed_bid?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${pagination.limit}&search=${search}`,
      {},
      token
    ).then((response) => {
      if (response.status === 200) {
        callback(true);
        dispatch(get_completed_bid(response.data));
      } else if (response.status === 401) {
        toastErrorAction(dispatch, response.msg);
        callback(false);
      } else {
        callback(false);
      }
    });
  };
};

/****** action creator for list users active bid ********/
export const getUserActiveBid = (
  { page, search = "", long = "", lat = "", category = "" },
  callback
) => {
  return (dispatch, getState) => {
    const skip = (page - 1) * pagination.limit;
    const {
      data: { token }
    } = getState().user;

    ApiClient.get(
      `${apiUrl}/api/user_active_bid?lat=${lat}&long=${long}&category=${category}&skip=${skip}&limit=${pagination.limit}&search=${search}`,
      {},
      token
    ).then((response) => {
      if (response.status === 200) {
        dispatch(get_active_bid(response.data));
        callback(true);
      } else if (response.status === 401) {
        toastErrorAction(dispatch, response.msg);
        callback(false);
      } else {
        callback(false);
      }
    });
  };
};

/****** action creator for get user bid details ********/
export const getUserJobDetails = (params) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    dispatch(is_fetching(true));
    ApiClient.get(`${apiUrl}/bid/user_job_detail`, params, token).then(
      (response) => {
        if (response.status === 200) {
          dispatch(user_job_details(response.data));
        } else if (response.status === 401) {
          toastErrorAction(dispatch, response.msg);
        } else {
          toastErrorAction(dispatch, response.msg);
        }
        dispatch(is_fetching(false));
      }
    );
  };
};

/****** action creator for get Bidder Review for the bid ********/
export const getBidderReview = (bidder_id, callback = () => {}) => {
  return (dispatch, getState) => {
    const {
      data: { token, _id }
    } = getState().user;
    ApiClient.get(
      `${apiUrl}/reviews/get_user_reviews/${bidder_id}`,
      {},
      token
    ).then((response) => {
      if (response.status === 200) {
        callback(response.data);
        if (_id === bidder_id) {
          dispatch({ type: TYPE.USERS_REVIEW, data: response.data });
        }
      } else if (response.status === 401) {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      } else {
        toastErrorAction(dispatch, response.msg);
      }
    });
  };
};

/****** action creator for reject the bid ********/
export const rejectBid = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.put(`${apiUrl}/bid/reject_bid`, params, token).then(
      (response) => {
        if (response.status === 200) {
          toastAction(true, response.msg);
          callback(true);
          // dispatch(reject_bid(response.data));
        } else if (response.status === 401) {
          callback(false);
          toastErrorAction(dispatch, response.msg);
        } else {
          toastErrorAction(dispatch, response.msg);
        }
      }
    );
  };
};

/****** action creator for get accept the bid ********/
export const acceptBid = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.put(`${apiUrl}/bid/accept_bid`, params, token).then(
      (response) => {
        if (response.status === 200) {
          toastAction(true, response.msg);
          callback(true);
          // dispatch(accept_bid(response.data));
        } else if (response.status === 402) {
          toastAction(false, response.msg);
          callback(false);
        } else {
          toastAction(false, response.msg);
        }
      }
    );
  };
};

/****** action creator for start bid work ********/
export const startBid = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.post(`${apiUrl}/bid/start_bid_work`, params, token).then(
      (response) => {
        if (response.status === 200) {
          toastAction(true, response.msg);
          callback(true);
        } else if (response.status === 402) {
          callback(false);
          toastAction(false, response.msg);
        } else {
          callback(false);
          toastErrorAction(dispatch, response.msg);
        }
      }
    );
  };
};

/****** action creator for for end bid work ********/
export const endBid = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.post(`${apiUrl}/bid/end_bid_work`, params, token).then(
      (response) => {
        if (response.status === 200) {
          callback(true);
          toastAction(true, response.msg);
        } else if (response.status === 402) {
          callback(false);
          toastAction(false, response.msg);
        } else {
          callback(false);
          toastErrorAction(dispatch, response.msg);
        }
      }
    );
  };
};

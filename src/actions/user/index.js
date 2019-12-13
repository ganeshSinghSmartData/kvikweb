import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction, toastErrorAction } from "../toast-actions";

export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });
export const is_search = status => ({ type: TYPE.IS_STATUS, status });
export const register_users = data => ({ type: TYPE.REGISTER_USERS, data });
export const login_users = data => ({ type: TYPE.LOGIN_USERS, data });
export const logout_users = data => ({ type: TYPE.LOGOUT_USERS, data });
export const user_bid_listing = data => ({ type: TYPE.USER_BID_LISTING, data });
export const get_user_details = data => ({ type: TYPE.GET_USER_DETAILS, data });
export const update_user_details = data => ({
  type: TYPE.UPDATE_USER_DETAILS,
  data
});

/****** action creator for register users ********/
export const registerUser = (params, callback) => {
  return dispatch => {
    ApiClient.post(`${apiUrl}/register`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(register_users(response));
        toastAction(true, response.msg);
        callback(true);
      } else {
        console.log("errror with 401 : ", response);
        toastErrorAction(dispatch, response.msg);
      }
    });
  };
};

/****** action creator for login users jobs ********/
export const loginUser = (params, callback) => {
  return dispatch => {
    ApiClient.post(`${apiUrl}/login`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(login_users(response));
        // toastAction(true, "User successfully logged In");
        callback(true);
      } else if (response.status === 404) {
        toastErrorAction(dispatch, response.msg);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for logout ********/
export const logout = (params = {}) => {
  return (dispatch, getState) => {
    dispatch(is_fetching(true));
    const {
      data: { token }
    } = getState().user;
    ApiClient.post(`${apiUrl}/logout`, params, token).then(response => {
      if (response.status === 200) {
        toastAction(true, "User successfully logged out");
        dispatch(is_fetching(false));
        dispatch(logout_users());
      } else {
        dispatch(is_fetching(false));
        toastAction(false, response.msg);
      }
    });
  };
};

/****** action creator for login users jobs ********/
export const getUserBid = params => {
  return (dispatch, getState) => {
    /* const {
        data: { token }
      } = getState().user; */
    // api/user_bid?skip=0&limit=10
    ApiClient.get(`${apiUrl}/api/user_bid`, params).then(response => {
      if (response.status === 200) {
        dispatch(user_bid_listing(response));
      } else if (response.status === 401) {
        toastErrorAction(dispatch, response.message);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for login users jobs ********/
export const getUserDetails = user_id => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.get(`${apiUrl}/userDetails/${user_id}`, {}, token).then(
      response => {
        if (response.status === 200) {
          dispatch(get_user_details(response.data));
        } else if (response.status === 401) {
          toastErrorAction(dispatch, response.msg);
        } else {
          dispatch(is_fetching(false));
        }
      }
    );
  };
};

/****** action creator for update users details ********/
export const updateUserDetails = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.put(`${apiUrl}/updateUser`, params, token).then(response => {
      console.log("response while updattinnuser : ", response);
      if (response.status === 200) {
        callback(true);
        dispatch(update_user_details(response.data));
      } else if (response.status === 401) {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

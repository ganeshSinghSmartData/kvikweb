import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction, toastErrorAction } from "../toast-actions";

export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });
export const is_search = status => ({ type: TYPE.IS_STATUS, status });
export const register_users = data => ({ type: TYPE.REGISTER_USERS, data });
export const login_users = data => ({ type: TYPE.LOGIN_USERS, data });
export const logout_users = data => ({ type: TYPE.LOGOUT_USERS, data });

/****** action creator for register users ********/
export const registerUser = (params, callback) => {
  return (dispatch, getState) => {
    /* const {
      data: { loginToken }
    } = getState().user; */
    ApiClient.post(`${apiUrl}/register`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(register_users(response));
        toastAction(false, response.message);
        callback(true);
      } else if (response.status === 401) {
        console.log("errror with 401 : ");
        toastErrorAction(dispatch, response.message);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for login users jobs ********/
export const loginUser = (params, callback) => {
  return (dispatch, getState) => {
    /* const {
        data: { loginToken }
      } = getState().user; */
    ApiClient.post(`${apiUrl}/login`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        dispatch(login_users(response));
        toastAction(false, response.message);
        callback(true);
      } else if (response.status === 401) {
        console.log("errror with 401 : ");
        // toastErrorAction(dispatch, response.message);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

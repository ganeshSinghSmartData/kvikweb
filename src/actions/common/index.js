import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction } from "../toast-actions";

export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });
export const about_us = data => ({ type: TYPE.ABOUT_US, data });
// export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });

/****** action creator for list users cpmpleted job ********/
export const contactUs = (params, callback) => {
  return dispatch => {
    ApiClient.post(`${apiUrl}/contact/contact_us`, params).then(response => {
      if (response.status === 200) {
        callback(true);
      } else if (response.status === 404) {
        callback(false);
        toastAction(false, response.msg);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

/****** action creator for get the about us details ********/
export const getCustomPageDetails = (page_name, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.fetch(`${apiUrl}/content/${page_name}`).then(response => {
      if (response.status === 200) {
        callback(true);
        // toastAction(true, response.msg);
        dispatch(about_us(response.data));
      } else if (response.status === 401) {
        callback(false);
        toastAction(false, response.msg);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

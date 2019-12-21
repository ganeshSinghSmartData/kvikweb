/*
 * @file: messages->index.js
 * @description: It Contain messages related Action Creators.
 * @author: smartData
 */
import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction, toastErrorAction } from "../toast-actions";

//**** Thunk Action Creators For Api ****//
export const is_fetching = (status) => ({ type: TYPE.IS_FETCHING, status });
export const list = (data) => ({ type: TYPE.MESSAGES_LIST, data });
export const get_message = (data) => ({ type: TYPE.GET_MESSAGE, data });
export const message_count = (data) => ({ type: TYPE.MESSAGE_COUNT, data });
export const chat_users = (data) => ({ type: TYPE.CHAT_USERS, data });

/****** action creator for getting messages********/
export const messages_list = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token, _id }
    } = getState().user;
    ApiClient.get(`${apiUrl}/chat/chat/${params.id}/${_id}?limit=${params.limit}&skip=${params.skip}}`, {}, token).then(
      response => {
        if (response.status === 200) {
          dispatch(list(response.data));
        } else if (response.status === 401) {
          toastErrorAction(dispatch, response.msg);
        } else {
          dispatch(is_fetching(false));
        }
      }
    );
  };
};
/****** action creator for message count********/
export const messages_count = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token, _id }
    } = getState().user;
    ApiClient.get(`${apiUrl}/chat/unread_message_count`, {}, token).then(
      response => {
        if (response.status === 200) {
          dispatch(message_count(response.data));
        } else if (response.status === 401) {
          toastErrorAction(dispatch, response.msg);
        } else {
          dispatch(is_fetching(false));
        }
      }
    );
  };
};

/****** action creator for getting notifications********/
export const notifications = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token, _id }
    } = getState().user;
    ApiClient.get(`${apiUrl}/chat/list/${_id}?limit=${params.limit}&skip=${params.skip}`, {}, token).then(
      response => {
        if (response.status === 200) {
          dispatch(chat_users(response.data));
        } else if (response.status === 401) {
          toastErrorAction(dispatch, response.msg);
        } else {
          dispatch(is_fetching(false));
        }
      }
    );
  };
};


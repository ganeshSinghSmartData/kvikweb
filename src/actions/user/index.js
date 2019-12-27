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
export const user_cards = data => ({ type: TYPE.USER_CARDS, data });
export const remove_card = data => ({ type: TYPE.REMOVE_CARD, data });
export const update_user_details = data => ({
  type: TYPE.UPDATE_USER_DETAILS,
  data
});
export const update_user_profile = data => ({
  type: TYPE.UPDATE_USER_PROFILE,
  data
});
export const update_user_image = data => ({
  type: TYPE.UPDATE_USER_IMAGE,
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
        callback(false);
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
        callback(true);
      } else if (response.status === 404) {
        callback(false);
        toastAction(false, response.msg);
      } else {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      }
    });
  };
};

/****** action creator for send otp to email for forgot password ********/
export const forgotPassword = (params, callback) => {
  return dispatch => {
    ApiClient.post(`${apiUrl}/forgotPasswordOTP`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        // dispatch(login_users(response));
        toastAction(true, response.msg);
        callback(true);
      } else if (response.status === 404) {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      } else {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      }
    });
  };
};

/****** action creator for change password for a user ********/
export const changePassword = (params, callback) => {
  return dispatch => {
    ApiClient.post(`${apiUrl}/forgotPassword`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        // dispatch(login_users(response));
        toastAction(true, response.msg);
        callback(true);
      } else if (response.status === 404) {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      } else {
        callback(false);
        toastErrorAction(dispatch, response.msg);
      }
    });
  };
};

/****** action creator for verify users email ********/
export const verifyEmail = (params, callback) => {
  return dispatch => {
    ApiClient.get(
      `${apiUrl}/verifyEmail/${params.userId}/${params.otp}`,
      params
    ).then(response => {
      if (response.status === 200) {
        toastAction(true, response.msg);
        if (response.msg === "Already verified") {
          callback(false);
        }
      } else if (response.status === 404) {
        toastErrorAction(dispatch, response.msg);
      } else {
        callback(response.msg);
        toastErrorAction(dispatch, response.msg);
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
      } else if (response.status === 402) {
        dispatch(is_fetching(false));
        toastAction(false, response.msg);
      } else {
        dispatch(logout_users());
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

/****** action creator for add card ********/
export const AddCard = (params = {}, callback) => {
  return (dispatch, getState) => {
    dispatch(is_fetching(true));
    const {
      data: { token }
    } = getState().user;
    ApiClient.post(`${apiUrl}/payment/saveCardByToken`, params, token).then(
      response => {
        if (response.status === 200) {
          toastAction(true, "Card successfully saved");
          callback(true);
        } else {
          toastAction(false, response.msg);
          callback(false);
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

/****** action creator for add card ********/
export const GetCards = (params = {}) => {
  return (dispatch, getState) => {
    dispatch(is_fetching(true));
    const {
      data: { token }
    } = getState().user;
    ApiClient.get(`${apiUrl}/payment/getUserSavedCards`, {}, token).then(
      response => {
        if (response.status === 200) {
          dispatch(user_cards(response.data));
          dispatch(is_fetching(false));
        } else {
          dispatch(is_fetching(false));
          // toastAction(false, response.msg);
        }
      }
    );
  };
};

/****** action creator for upload user profile picture ********/
export const uploadUserImage = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient._postFormData(`${apiUrl}/imageUpload`, params, token).then(
      response => {
        if (response.status === 200) {
          callback(true);
          dispatch(update_user_image(response.data));
        } else if (response.status === 401) {
          callback(false);
          toastErrorAction(dispatch, response.msg);
        } else {
          dispatch(is_fetching(false));
        }
      }
    );
  };
};

/****** action creator for remove card ********/
export const removeCard = (card_id, callback) => {
  return (dispatch, getState) => {
    dispatch(is_fetching(true));
    const {
      data: { token }
    } = getState().user;
    ApiClient.delete(
      `${apiUrl}/payment/deleteUserPaymentDetail/${card_id}`,
      token
    ).then(response => {
      if (response.status === 200) {
        dispatch(remove_card(response.deleted));
        toastAction(true, response.msg);
        callback(true);
      } else {
        callback(false);
        toastAction(false, response.msg);
      }
    });
  };
};

/****** action creator for bank account ********/
export const AddBankAccount = (params, callback) => {
  return (dispatch, getState) => {
    dispatch(is_fetching(true));
    const {
      data: { token }
    } = getState().user;
    ApiClient._postFormData(
      `${apiUrl}/payment/saveBankByToken`,
      params,
      token
    ).then(response => {
      if (response.status === 200) {
        toastAction(true, response.msg);
        callback(true);
      } else {
        callback(false);
        toastAction(false, response.msg);
      }
    });
  };
};

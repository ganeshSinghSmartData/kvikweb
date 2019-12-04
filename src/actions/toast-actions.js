/*
 * @file: toast-actions.js
 * @description: It Contain toasts Action function.
 * @author: smartData
 */

import { push } from "connected-react-router";
import { toast } from "react-toastify";
import * as TYPE from "./constants";

export const toastAction = (status, message) => {
  if (status) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
  }
};

export const toastErrorAction = (dispatch, message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    onClose: () => {
      dispatch(push("/"));
    }
  });
  dispatch({ type: TYPE.LOGOUT_USERS });
};

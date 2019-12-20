import * as TYPE from "../constants";
import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import { toastAction } from "../toast-actions";
import { pagination } from "../../utilities/constants";

export const is_fetching = status => ({ type: TYPE.IS_FETCHING, status });

/****** action creator for list users cpmpleted job ********/
export const contactUs = (params, callback) => {
  return (dispatch, getState) => {
    const {
      data: { token }
    } = getState().user;
    ApiClient.delete(`${apiUrl}/contact-us}`, params, token).then(response => {
      if (response.status === 200) {
        console.log("response: ", response);
        callback(true);
        toastAction(true, response.msg);
      } else if (response.status === 401) {
        console.log("errror with 401 : ");
        callback(false);
        toastAction(false, response.msg);
      } else {
        dispatch(is_fetching(false));
      }
    });
  };
};

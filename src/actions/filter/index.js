import ApiClient from "../../api-client";
import { apiUrl } from "../../environment";
import * as TYPE from "../constants";
export const filterRange=()=>{
    return dispatch=>{
        dispatch({type:TYPE.FILTER_REQUEST});
        ApiClient.get(
          `${apiUrl}/api/filter_range`,
          {}
        ).then(response => {
          if (response.status === 200) {
            dispatch({type:TYPE.FILTER_SUCCESS,payload:response.data});
          } else if (response.status === 401) {
            dispatch({type:TYPE.FILTER_FAIL});
            // toastErrorAction(dispatch, response.message);
          } else {
            dispatch({type:TYPE.FILTER_FAIL});
          }
        });
    }
}
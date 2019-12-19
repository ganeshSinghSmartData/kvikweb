/*
 * @file: messages.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @author: smartData
*/

import * as TYPE from '../../actions/constants';

/******** Reducers ********/
const initialState = {
    data: [],
    count: 0
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TYPE.MESSAGES_LIST:
            return { ...state, data: action.data.reverse() };
        case TYPE.GET_MESSAGE:
            state.data.push(action.data);
            return state;
        case TYPE.LOGOUT_USERS:
            return initialState;
        default:
            return state;
    }
}

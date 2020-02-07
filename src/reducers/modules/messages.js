/*
 * @file: messages.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @author: smartData
 */

import * as TYPE from "../../actions/constants";

/******** Reducers ********/
const initialState = {
  data: [],
  count: 0,
  chatUsers: [],
  showChat: false,
  chatId: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.MESSAGES_LIST:
      return { ...state, data: action.data.reverse() };
    case TYPE.GET_MESSAGE:
      state.data.push(action.data);
      return state;
    case TYPE.MESSAGE_COUNT:
      return { ...state, count: action.data.count };
    case TYPE.CHAT_USERS:
      return { ...state, chatUsers: action.data };
    case TYPE.TOGGLE_CHAT:
      return {
        ...state,
        showChat: action.chat ? action.chat.toggle : false,
        chatId: action.chat ? action.chat.chatId : ""
      };
    case TYPE.LOGOUT_USERS:
      return initialState;
    case TYPE.UPDATE_CHAT_IMAGE:
      return {
        ...state,
        chatImage: action.data.image
      };
    default:
      return state;
  }
}

/*********** Reduceres defined here *********/

import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import loader from "./modules/loader";
import user from "./modules/user";
import home from "./modules/home";
import job from "./modules/job";
import bid from "./modules/bid";
import messages from "./modules/messages";

const history = createBrowserHistory();

const userPersistConfig = {
  key: "Kvik-task",
  storage: storage,
  // transforms: [encryptor],
  blacklist: ["router", "loader"]
};

export default persistCombineReducers(userPersistConfig, {
  router: connectRouter(history),
  loader,
  user,
  home,
  job,
  bid,
  messages
});

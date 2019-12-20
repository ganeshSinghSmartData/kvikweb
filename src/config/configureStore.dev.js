/*
 * @file: configureStore.dev.js
 * @description: Configure/creating redux store with thunk,reducer etc
 * @author: smartData
 * */

import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import reducers from "../reducers";

const logger = store => next => action => {
  return next(action);
};

export default history => {
  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(logger, thunk, routerMiddleware(history))
    )
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

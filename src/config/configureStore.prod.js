/*
 * @file: configureStore.prod.js
 * @description: Configure/creating redux store with thunk,reducer etc
 * @author: smartData
 * */

import { applyMiddleware, createStore, compose } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import reducers from "../reducers";
export var storeObj = {};
export default (history) => {
  const store = createStore(
    reducers,
    compose(applyMiddleware(thunk, routerMiddleware(history)))
  );
  const persistor = persistStore(store);
  storeObj.store = store;
  return { persistor, store };
};

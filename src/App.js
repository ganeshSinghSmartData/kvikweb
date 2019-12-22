/* import React from 'react';
import Routers from '../src/routers/index';
function App() {
  return (
    <Routers />
    // <div className="App">
    //   <Header />
    //   <Banner/>
    //   </div>     
  );
}

export default App;



 */
/*
 * @file: App.js
 * @description: App Configration
 * @author: smartData
 * */

import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configureStore from "./config";
import Routers from "./routers";
import Loader from "./components/commonUi/loader/loader";

export const history = createBrowserHistory();
/************ store configration *********/
const { persistor, store } = configureStore(history);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ToastContainer />
          <Routers {...store} />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

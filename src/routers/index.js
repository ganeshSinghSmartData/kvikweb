/*********** Routes for applications **************/
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  publicLayout,
  privateLayout,
  commonLayout
} from "../components/Layouts";
import AppRoute from "./AppRoute";
import { Authorization } from "../authorization";
import { public_type, private_type } from "../utilities/constants";
import { User } from '../authorization';
import HomePage from "../containers/home";
import JobDetails from "../containers/job/job-details";
import PostNewJob from "../containers/job/post-job";
import BidList from "../containers/bid/bid-list";
import JobProposal from "../containers/job/job-proposal";
import JobList from "../containers/job/job-list";
import VerifyEmail from "../components/emailVerify";
import Profile from "../containers/user/profile";
import { socketUrl } from '../environment';
import SocketClient from '../config/socket';

const Routers = store => {
  const res = User(store);
  if (res && res.loggedIn) {
    SocketClient.init(socketUrl, res.data.token, store.dispatch);
  }
  return (
    <Router>
      <Switch>
        <AppRoute
          path="/"
          exact={true}
          component={HomePage}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={public_type}
        />

        <AppRoute
          path="/login"
          exact={true}
          component={HomePage}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={public_type}
        />
        <AppRoute
          path="/register"
          exact={true}
          component={HomePage}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={public_type}
        />
        <AppRoute
          path="/job-details/:job_id"
          exact={true}
          component={JobDetails}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={public_type}
        />
        <AppRoute
          exact={true}
          path="/post-job"
          component={PostNewJob}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={private_type}
        />
        <AppRoute
          path="/bid-list"
          exact={true}
          component={BidList}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={private_type}
        />
        <AppRoute
          path="/bid-details/:job_id"
          exact={true}
          component={JobDetails}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={public_type}
        />
        <AppRoute
          path="/job-list"
          exact={true}
          component={JobList}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={private_type}
        />
        <AppRoute
          path="/job-proposal/:job_id"
          exact={true}
          component={JobProposal}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={private_type}
        />
        <AppRoute
          path="/verify-email/:user_id/:otp"
          exact={true}
          component={VerifyEmail}
          requireAuth={Authorization}
          layout={commonLayout}
          store={store}
          type={public_type}
        />
        <AppRoute
          path="/profile"
          exact={true}
          component={Profile}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={private_type}
        />
        <AppRoute
          path="/edit-profile"
          exact={true}
          component={Profile}
          requireAuth={Authorization}
          layout={publicLayout}
          store={store}
          type={private_type}
        />
      </Switch>
    </Router>
  );
};

export default Routers;

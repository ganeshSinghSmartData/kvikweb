/*********** Routes for applications **************/
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Job from "../components/jobs/jobs";
import Header from "../components/header/header";
import Login from "../containers/auth/login";
import Register from "../containers/auth/register";

const Routers = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Job} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default Routers;

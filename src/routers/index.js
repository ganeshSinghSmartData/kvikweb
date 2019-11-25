/*********** Routes for applications **************/
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Job from '../components/jobs/jobs';
import Header from '../components/header/header';
const Routers = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={Job} />
            </Switch>
        </Router>
    );
};

export default Routers;
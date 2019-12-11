import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Job from "../../../components/jobs/jobs";
import { getUserActiveBid, getUserCompletedBid } from "./../../../actions/bid";

class BidList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleUserNotAcceptedBid = this.handleUserNotAcceptedBid.bind(this);
        this.handleUserAcceptedBid = this.handleUserAcceptedBid.bind(this);
    }

    componentDidMount() {
        this.props.getUserActiveBid({ page: 1 });
        this.props.getUserCompletedBid({ page: 1 });
    }
    // handleUserNotAcceptedBid
    handleUserNotAcceptedBid = (value) => {
        console.log('value handleUserNotAcceptedBid : ', value);
    }

    // handleUserAcceptedBid
    handleUserAcceptedBid = (value) => {
        console.log('value handleUserAcceptedBid : ', value);
    }

    render() {
        return (
            <React.Fragment>
                <Job path={this.props.match.path} _handleUserAcceptedBid={() => this.handleUserAcceptedBid()} _handleUserNotAcceptedBid={() => this.handleUserNotAcceptedBid()} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    activeBid: state.bid.activeBid,
    completedBid: state.bid.completedBid,

});

const mapDispatchToProps = dispatch => ({
    getUserActiveBid: bindActionCreators(getUserActiveBid, dispatch),
    getUserCompletedBid: bindActionCreators(getUserCompletedBid, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BidList);

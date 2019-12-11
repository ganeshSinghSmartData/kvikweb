import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Loader from "./../../../components/Loader";
import { getUserActiveBid, getUserCompletedBid } from "./../../../actions/bid";

class BidList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            dataload: false
        };

        this.handleJobPost = this.handleJobPost.bind(this);
    }

    componentDidMount() {
        this.props.getUserActiveBid();
        this.props.getUserCompletedBid();
    }

    //   Handling Job Ppost
    handleJobPost() {
    }

    //   Handling Job Update
    handleJobUpdate() {
    }

    render() {
        return (<React.Fragment></React.Fragment>);
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

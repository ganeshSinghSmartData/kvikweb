import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import JobDetail from "./../../../components/jobs/jobDetail/jobDetail";
import { getUserJobDetails } from "../../../actions/bid";

class JobProposal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        const params = this.props.match.params.job_id;
        if (params) {
            this.props.getUserJobDetails({ jobId: params });
        }
    }

    render() {
        let pathname = "";
        if (this.props.match.path.search("/job-proposal") !== -1) {
            pathname = "/job-proposal";
        }
        return (
            <React.Fragment>
                {Object.keys(this.props.userJobDetails).length && (
                    <JobDetail job={this.props.userJobDetails} history={this.props.history} path={pathname}></JobDetail>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    userJobDetails: state.bid.userJobDetails
});

const mapDispatchToProps = dispatch => ({
    getUserJobDetails: bindActionCreators(getUserJobDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobProposal);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Job from "./../../../components/jobs/jobs";
import { pagination } from "../../..//utilities/constants";

import { getUserActiveJob, getUserCompletedJob } from "../../../actions/job";

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleUserActiveJob = this.handleUserActiveJob.bind(this);
        this.handleUserCompletedJob = this.handleUserCompletedJob.bind(this);
    }


    componentDidMount() {
        this.props.getUserActiveJob({ page: pagination.page });
        this.props.getUserCompletedJob({ page: pagination.page });
    }

    handleUserActiveJob(page) {
        console.log('page : ', page);
    }

    handleUserCompletedJob(page) {
        console.log('page : ', page);
    }


    render() {
        return (
            <React.Fragment>
                <Job path={this.props.match.path} _handleUserActiveJob={() => this.handleUserActiveJob()} _handleUserCompletedJob={() => this.handleUserCompletedJob()} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    activeJobs: state.job.activeJobProduct,
    completedJobs: state.job.completedJobProduct
});

const mapDispatchToProps = dispatch => ({
    getUserActiveJob: bindActionCreators(getUserActiveJob, dispatch),
    getUserCompletedJob: bindActionCreators(getUserCompletedJob, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Job from "./../../../components/jobs/jobs";
import { pagination } from "../../..//utilities/constants";

import {
  getUserActiveJob,
  getUserCompletedJob,
  reset_active_job,
  reset_completed_job,
  reset_job_details
} from "../../../actions/job";
import { reset_user_job_details } from "../../../actions/bid";
import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.handleUserActiveJob = this.handleUserActiveJob.bind(this);
    this.handleUserCompletedJob = this.handleUserCompletedJob.bind(this);
  }

  componentDidMount() {
    this.props.reset_job_details();
    this.props.reset_user_job_details();
    this.props.reset_active_job();
    this.handleUserActiveJob({ page: pagination.page });
    this.props.reset_completed_job();
    this.handleUserCompletedJob({ page: pagination.page });
  }

  handleUserActiveJob(page) {
    this.setState({ loading: true });
    this.props.getUserActiveJob(page, callback => {
      if (callback) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleUserCompletedJob(page) {
    this.setState({ loading: true });
    this.props.getUserCompletedJob(page, callback => {
      if (callback) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <SpinnerOverlay className="position-fixed" />
        ) : (
          <Job
            path={this.props.match.path}
            _handleUserActiveJob={page => this.handleUserActiveJob(page)}
            _handleUserCompletedJob={page => this.handleUserCompletedJob(page)}
          />
        )}
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
  getUserCompletedJob: bindActionCreators(getUserCompletedJob, dispatch),
  reset_active_job: bindActionCreators(reset_active_job, dispatch),
  reset_completed_job: bindActionCreators(reset_completed_job, dispatch),
  reset_job_details: bindActionCreators(reset_job_details, dispatch),
  reset_user_job_details: bindActionCreators(reset_user_job_details, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);

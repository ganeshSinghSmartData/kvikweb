import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

import JobDetail from "./../../../components/jobs/jobDetail/jobDetail";
import { getUserJobDetails } from "../../../actions/bid";
import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import { deleteMyJob, reset_job_details } from "../../../actions/job";

class JobProposal extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.deleteJob = this.deleteJob.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.props.reset_job_details();
    const params = this.props.match.params.job_id;
    if (params) {
      this.props.getUserJobDetails({ jobId: params });
    }
  }
  confirmDelete = value => {
    confirmAlert({
      title: "",
      message: "Are you sure do you want to delete this job ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteJob(value)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  deleteJob = jobId => {
    this.props.deleteMyJob({ job_id: jobId }, callback => {
      if (callback) {
        this.props.history.push("/job-list");
      }
    });
  };

  render() {
    let pathname = "";
    if (this.props.match.path.search("/job-proposal") !== -1) {
      pathname = "/job-proposal";
    }
    return (
      <React.Fragment>
        {Object.keys(this.props.userJobDetails).length ? (
          <JobDetail
            job={this.props.userJobDetails}
            history={this.props.history}
            path={pathname}
            _isLoading={this.state.isLoading}
            _deleteJob={this.confirmDelete}
          ></JobDetail>
        ) : (
          <SpinnerOverlay className="position-fixed" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userJobDetails: state.bid.userJobDetails
});

const mapDispatchToProps = dispatch => ({
  getUserJobDetails: bindActionCreators(getUserJobDetails, dispatch),
  deleteMyJob: bindActionCreators(deleteMyJob, dispatch),
  reset_job_details: bindActionCreators(reset_job_details, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobProposal);

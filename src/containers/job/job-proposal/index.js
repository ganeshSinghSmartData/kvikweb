import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

import JobDetail from "./../../../components/jobs/jobDetail/jobDetail";
import { getUserJobDetails } from "../../../actions/bid";
import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import {
  deleteMyJob,
  reset_job_details,
  approvedBidWork
} from "../../../actions/job";
import { endBid } from "../../../actions/bid";
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
  confirmDelete = (value) => {
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

  deleteJob = (jobId) => {
    this.props.deleteMyJob({ job_id: jobId }, (callback) => {
      if (callback) {
        this.props.history.push("/job-list");
      }
    });
  };

  confirmApproveJob = (job_id, job_seeker_id, job_provider_id) => {
    confirmAlert({
      title: "",
      message: "Are you sure do you want to approve this job ?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            this.props.approvedBidWork(
              {
                job_id,
                job_seeker_id,
                job_provider_id
              },
              (callback) => {
                if (callback) {
                  this.setState({ isStatusLoading: false, isLoading: false });
                  this.props.history.push("/bid-list");
                }
              }
            )
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  confirmEndBidWork = (jobId, jobSeekerId, userId) => {
    confirmAlert({
      title: "",
      message: "Are you sure do you want to end this job ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.endBidWork(jobId, jobSeekerId, userId)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };
  endBidWork(jobId, jobSeekerId, userId) {
    this.setState({ isStatusLoading: true, isLoading: true });
    const reqData = {
      job_id: jobId,
      job_seeker_id: jobSeekerId,
      job_provider_id: userId
    };
    this.props.endBid(reqData, (callback) => {
      if (callback) {
        this.setState({ isStatusLoading: false, isLoading: false });
        this.props.history.push("/bid-list");
      } else {
        this.setState({ isStatusLoading: false, isLoading: false });
        this.props.history.push("/bid-list");
      }
    });
  }
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
            _isLoading={this.props._isLoading}
            _deleteJob={this.confirmDelete}
            _endJob={(jobId, jobSeekerId, userId) =>
              this.confirmEndBidWork(jobId, jobSeekerId, userId)
            }
            _approveJob={this.confirmApproveJob}
          ></JobDetail>
        ) : (
          <SpinnerOverlay className="position-fixed" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userJobDetails: state.bid.userJobDetails,
  _isLoading: state.loader.isFetching,
  lang: state.user.lang
});

const mapDispatchToProps = {
  getUserJobDetails,
  deleteMyJob,
  reset_job_details,
  approvedBidWork,
  endBid
};

export default connect(mapStateToProps, mapDispatchToProps)(JobProposal);

import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import JobDetail from "../../../components/jobs/jobDetail/jobDetail";
import {
  getJobDetails,
  reset_job_details,
  approvedBidWork
} from "../../../actions/job";
import {
  getUserJobDetails,
  startBid,
  endBid,
  reset_user_job_details
} from "../../../actions/bid";
import "./../../../components/jobs/jobDetail/jobDetail.scss";

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { pathname: "", isLoading: false, isStatusLoading: false };
    this.startBidWork = this.startBidWork.bind(this);
    this.endBidWork = this.endBidWork.bind(this);
  }

  confirmApproveJob = (jobId, jobSeekerId, userId) => {
    confirmAlert({
      title: "",
      message: "Are you sure do you want to approve this job ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.approvedBidWork(jobId, jobSeekerId, userId)
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  confirmStartBidWork = (jobId, jobSeekerId, userId) => {
    confirmAlert({
      title: "",
      message: "Are you sure do you want to start this job ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.startBidWork(jobId, jobSeekerId, userId)
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

  startBidWork(jobId, jobSeekerId, userId) {
    this.setState({ isStatusLoading: true, isLoading: true });
    const reqData = {
      job_id: jobId,
      job_seeker_id: jobSeekerId,
      job_provider_id: userId
    };
    this.props.startBid(reqData, (callback) => {
      if (callback) {
        this.setState({ isStatusLoading: false, isLoading: false });
        this.props.history.push("/bid-list");
      } else {
        this.setState({ isStatusLoading: false, isLoading: false });
        this.props.history.push("/bid-list");
      }
    });
  }

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

  componentDidMount() {
    const params = this.props.match.params.job_id;
    if (params) {
      if (this.props.match.path.includes("/job-details")) {
        this.props.getUserJobDetails({ jobId: params });
        this.setState({ pathname: "/job-details" });
      }
      if (this.props.match.path.includes("/bid-details")) {
        this.props.getUserJobDetails({ jobId: params });
        this.setState({ pathname: "/bid-details" });
      }
    }
  }

  componentWillUnmount() {
    this.props.reset_user_job_details();
    this.props.reset_job_details();
  }

  render() {
    let userJobDetails = {};
    if (Object.keys(this.props.userJobDetails).length) {
      userJobDetails = this.props.userJobDetails;
    }
    if (this.props.match.path.includes("/bid-details")) {
      if (Object.keys(this.props.userJobDetails).length) {
        userJobDetails = this.props.userJobDetails;
      }
    }
    return (
      <React.Fragment>
        {Object.keys(userJobDetails).length ? (
          <JobDetail
            job={userJobDetails}
            history={this.props.history}
            path={this.state.pathname}
            _startJob={(jobId, jobSeekerId, userId) =>
              this.confirmStartBidWork(jobId, jobSeekerId, userId)
            }
            _endJob={(jobId, jobSeekerId, userId) =>
              this.confirmEndBidWork(jobId, jobSeekerId, userId)
            }
            _isLoading={this.props._isLoading}
            _isStatusLoading={this.state.isStatusLoading}
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
  jobs: state.job.jobProduct,
  jobDetails: state.job.jobDetails,
  userJobDetails: state.bid.userJobDetails,
  _isLoading: state.loader.isFetching
});

const mapDispatchToProps = {
  getJobDetails,
  getUserJobDetails,
  startBid,
  endBid,
  reset_job_details,
  reset_user_job_details,
  approvedBidWork
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);

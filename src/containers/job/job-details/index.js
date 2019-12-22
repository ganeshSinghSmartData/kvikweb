import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { confirmAlert } from "react-confirm-alert";

import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import JobDetail from "../../../components/jobs/jobDetail/jobDetail";
import { getJobDetails, reset_job_details } from "../../../actions/job";
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
    this.confirmStartBidWork = this.confirmStartBidWork.bind(this);
    this.confirmEndBidWork = this.confirmEndBidWork.bind(this);
    this.startBidWork = this.startBidWork.bind(this);
    this.endBidWork = this.endBidWork.bind(this);
  }

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
    this.setState({ isStatusLoading: true });
    const reqData = {
      job_id: jobId,
      job_seeker_id: jobSeekerId,
      job_provider_id: userId
    };
    this.props.startBid(reqData, callback => {
      if (callback) {
        this.setState({ isStatusLoading: false });
        this.props.history.push("/bid-list");
      } else {
        this.setState({ isStatusLoading: false });
      }
    });
  }

  endBidWork(jobId, jobSeekerId, userId) {
    this.setState({ isStatusLoading: true });
    const reqData = {
      job_id: jobId,
      job_seeker_id: jobSeekerId,
      job_provider_id: userId
    };
    this.props.endBid(reqData, callback => {
      if (callback) {
        this.setState({ isStatusLoading: false });
        this.props.history.push("/bid-list");
      } else {
        this.setState({ isStatusLoading: false });
      }
    });
  }

  componentDidMount() {
    const params = this.props.match.params.job_id;
    if (params) {
      if (this.props.match.path.includes("/job-details")) {
        this.props.getJobDetails(params);
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
    let jobDetails = {};
    if (Object.keys(this.props.jobDetails).length) {
      jobDetails = this.props.jobDetails;
    }
    if (this.props.match.path.includes("/bid-details")) {
      if (Object.keys(this.props.userJobDetails).length) {
        jobDetails = this.props.userJobDetails;
      }
    }
    return (
      <React.Fragment>
        {Object.keys(jobDetails).length ? (
          <JobDetail
            job={jobDetails}
            history={this.props.history}
            path={this.state.pathname}
            _startJob={this.confirmStartBidWork}
            _endJob={this.confirmEndBidWork}
            _isLoading={this.state.isLoading}
            _isStatusLoading={this.state.isStatusLoading}
          ></JobDetail>
        ) : (
          <SpinnerOverlay className="position-fixed" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.job.jobProduct,
  jobDetails: state.job.jobDetails,
  userJobDetails: state.bid.userJobDetails
});

const mapDispatchToProps = dispatch => ({
  getJobDetails: bindActionCreators(getJobDetails, dispatch),
  getUserJobDetails: bindActionCreators(getUserJobDetails, dispatch),
  startBid: bindActionCreators(startBid, dispatch),
  endBid: bindActionCreators(endBid, dispatch),
  reset_job_details: bindActionCreators(reset_job_details, dispatch),
  reset_user_job_details: bindActionCreators(reset_user_job_details, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);

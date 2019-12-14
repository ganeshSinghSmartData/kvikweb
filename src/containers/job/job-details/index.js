import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import JobDetail from "../../../components/jobs/jobDetail/jobDetail";
import { getJobDetails } from "../../../actions/job";
import { getUserJobDetails } from "../../../actions/bid";

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { pathname: "" };
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
        {Object.keys(jobDetails).length && (
          <JobDetail
            job={jobDetails}
            history={this.props.history}
            path={this.state.pathname}
          ></JobDetail>
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
  getUserJobDetails: bindActionCreators(getUserJobDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);

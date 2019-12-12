import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import JobDetail from "../../../components/jobs/jobDetail/jobDetail";
import { getJobDetails } from "../../../actions/job";

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { pathname: "" };
  }

  componentDidMount() {
    const params = this.props.match.params.job_id;
    if (params) {
      this.props.getJobDetails(params);
    }
    if (this.props.match.path.search("/job-proposal") !== -1) {
      this.setState({ pathname: "/job-proposal" });
    }
    if (this.props.match.path.search("/bid-details") !== -1) {
      this.setState({ pathname: "/bid-details" });
    }
  }


  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.jobDetails).length && (
          <JobDetail job={this.props.jobDetails} history={this.props.history} path={this.state.pathname}></JobDetail>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.job.jobProduct,
  jobDetails: state.job.jobDetails
});

const mapDispatchToProps = dispatch => ({
  getJobDetails: bindActionCreators(getJobDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);

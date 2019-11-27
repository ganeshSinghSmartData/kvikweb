import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import JobDetail from "./../../components/jobs/jobDetail/jobDetail";
import { getJobDetails } from "./../../actions/job";

class JobDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const params = this.props.match.params.job_id;
    if (params) {
      this.props.getJobDetails(params);
    }
  }

  render() {
    return (
      <React.Fragment>
        <JobDetail job={this.props.jobDetails}></JobDetail>
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

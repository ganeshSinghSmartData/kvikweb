import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Bidder from "../../../components/jobs/bidderProfile";
import { pagination } from "../../..//utilities/constants";

class BidderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleUserActiveJob = this.handleUserActiveJob.bind(this);
    this.handleUserCompletedJob = this.handleUserCompletedJob.bind(this);
  }

  componentDidMount() {}

  handleUserActiveJob(page) {
    // this.props.reset_active_job();
    this.props.getUserActiveJob(page);
  }

  handleUserCompletedJob(page) {
    // this.props.reset_completed_job();
    this.props.getUserCompletedJob(page);
  }

  render() {
    return (
      <React.Fragment>
        <Bidder user_id={this.props.match.params.user_id}></Bidder>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  //   activeJobs: state.job.activeJobProduct
});

const mapDispatchToProps = dispatch => ({
  //   getUserActiveJob: bindActionCreators(getUserActiveJob, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BidderProfile);

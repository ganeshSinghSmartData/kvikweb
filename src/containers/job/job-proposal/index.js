import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import JobDetail from "./../../../components/jobs/jobDetail/jobDetail";
import { getUserJobDetails } from "../../../actions/bid";
import { approvedBidWork } from "../../../actions/job";

class JobProposal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.markJobComplete = this.markJobComplete.bind(this);
  }

  componentDidMount() {
    const params = this.props.match.params.job_id;
    if (params) {
      this.props.getUserJobDetails({ jobId: params });
    }
  }

  markJobComplete = (jobId, jobSeekerId, userId) => {
    const reqData = {
      job_seeker_id: userId,
      job_provider_id: jobSeekerId,
      job_id: jobId
    };
    console.log("i am in completen job : ", reqData);
    this.props.approvedBidWork(reqData, callback => {
      if (callback) {
        console.log(" I am in calback : ", callback);
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
        {Object.keys(this.props.userJobDetails).length && (
          <JobDetail
            job={this.props.userJobDetails}
            history={this.props.history}
            path={pathname}
            _markJobComplete={this.markJobComplete}
          ></JobDetail>
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
  approvedBidWork: bindActionCreators(approvedBidWork, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(JobProposal);

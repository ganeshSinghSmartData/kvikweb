import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PostJob from "../../components/jobs/postJob";
import { createNewJob } from "./../../actions/job";

class PostNewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1
    };

    this.handleJobPost = this.handleJobPost.bind(this);
    this.handleJobUpdate = this.handleJobUpdate.bind(this);
    this.handleStageChange = this.handleStageChange.bind(this);
  }

  componentDidMount() {}

  //   Handling Job Ppost
  handleJobPost(jobData, imageData) {
    console.log("jobData : ", jobData, imageData);
    // this.props.createNewJob(jobData);
  }

  //   Handling Job Update
  handleJobUpdate(jobData) {
    console.log("jobData : ", jobData);
    // this.props.createNewJob(jobData);
  }

  //   Handling Job state change
  handleStageChange(newstage) {
    this.setState({ stage: this.state.stage + newstage });
  }

  render() {
    return (
      <React.Fragment>
        <PostJob
          _currentstage={this.state.stage}
          _handleStageChange={this.handleStageChange}
          _handleJobPost={this.handleJobPost}
          _handleJobUpdate={this.handleJobUpdate}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  /* jobs: state.job.jobProduct,
  jobDetails: state.job.jobDetails */
});

const mapDispatchToProps = dispatch => ({
  createNewJob: bindActionCreators(createNewJob, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostNewJob);

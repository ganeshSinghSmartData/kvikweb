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
  handleJobPost(jobData, startDate, endDate, imageData, currentstage) {
    if (currentstage !== 3) {
      this.handleStageChange(1);
    } else {
      let formData = new FormData();

      for (var key in imageData) {
        if (!Number(imageData[key])) {
          formData.append("file", imageData[key]);
        }
      }
      console.log("jobData.startDate : ", typeof startDate, endDate);

      formData.append("category", jobData.category);
      formData.append("jobtitle", jobData.jobtitle);
      formData.append("description", jobData.description);
      formData.append("budget", jobData.budget);
      formData.append("street", jobData.street);
      formData.append("city", jobData.city);
      formData.append("location", jobData.location);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("frequency", jobData.frequency);
      /* this.props.createNewJob(formData, callback => {
        if (callback) {
          console.log("Job Successfullt poseted : ", callback);
          // this.props.history()
        }
      }); */
    }
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

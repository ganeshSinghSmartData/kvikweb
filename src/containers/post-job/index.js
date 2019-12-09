import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PostJob from "../../components/jobs/postJob";
import { createNewJob } from "./../../actions/job";

class PostNewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      dataload: false
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
      this.setState({ dataload: true });
      let formData = new FormData();

      for (var key in imageData) {
        if (!Number(imageData[key])) {
          formData.append("file", imageData[key]);
        }
      }
      const startdate = new Date(startDate);
      const newStartDate =
        startdate.getFullYear() +
        "-" +
        (startdate.getMonth() + 1) +
        "-" +
        startdate.getDate() +
        " " +
        startdate.toLocaleTimeString("en-US");
      const enddate = new Date(endDate);
      const newEndDate =
        enddate.getFullYear() +
        "-" +
        (enddate.getMonth() + 1) +
        "-" +
        enddate.getDate() +
        " " +
        enddate.toLocaleTimeString("en-US");

      formData.append("category", jobData.category);
      formData.append("jobtitle", jobData.jobtitle);
      formData.append("description", jobData.description);
      formData.append("budget", jobData.budget);
      formData.append("street", jobData.street);
      formData.append("city", jobData.city);
      formData.append("location", jobData.location);
      formData.append("jobStartDate", newStartDate);
      formData.append("jobEndDate", newEndDate);
      formData.append("frequency", jobData.frequency);
      this.props.createNewJob(formData, callback => {
        if (callback) {
          console.log("Job Successfullt poseted : ", callback);
          this.setState({ dataload: true });
          this.props.history.push("/");
        }
      });
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
        {this.state.dataload && (
          <div className="dataLoader block position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span
                class="spinner-border text-primary"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        )}
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

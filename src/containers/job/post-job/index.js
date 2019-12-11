import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PostJob from "../../../components/jobs/postJob";
import Loader from "./../../../components/Loader";
import { createNewJob } from "./../../../actions/job";

class PostNewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 3,
      dataload: false,
      imageValidator: false
    };

    this.handleJobPost = this.handleJobPost.bind(this);
    this.handleJobUpdate = this.handleJobUpdate.bind(this);
    this.handleStageChange = this.handleStageChange.bind(this);
  }

  componentDidMount() { }

  //   Handling Job Ppost
  handleJobPost(jobData, startDate, endDate, imageData, currentstage) {
    if (currentstage !== 3) {
      this.handleStageChange(1);
    } else {
      if (!Object.keys(imageData).length) {
        this.setState({ dataload: false, imageValidator: true });
      } else {
        let formData = new FormData();
        this.setState({ dataload: true, imageValidator: false });
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
            this.setState({ dataload: true });
            this.props.history.push("/");
          }
        });
      }
    }
  }

  //   Handling Job Update
  handleJobUpdate(jobData) {
    // this.props.createNewJob(jobData);
  }

  //   Handling Job state change
  handleStageChange(newstage) {
    this.setState({ stage: this.state.stage + newstage });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.dataload && <Loader loading={this.state.dataload} />}
        <PostJob
          _currentstage={this.state.stage}
          _handleStageChange={this.handleStageChange}
          _handleJobPost={this.handleJobPost}
          _handleJobUpdate={this.handleJobUpdate}
          _imageValidator={this.state.imageValidator}
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

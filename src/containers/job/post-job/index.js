import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PostJob from "../../../components/jobs/postJob";
import { CategoryItems } from "./../../../utilities/constants";
import {
  createNewJob,
  updateExistingJob,
  getJobDetails
} from "./../../../actions/job";

class PostNewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      pathname: "",
      selectedCategory: CategoryItems[0].value,
      dataload: false
    };

    this.handleJobPost = this.handleJobPost.bind(this);
    this.handleJobUpdate = this.handleJobUpdate.bind(this);
    this.handleStageChange = this.handleStageChange.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.job_id) {
      this.props.getJobDetails(this.props.match.params.job_id);
      this.setState({ pathname: "/edit-job" });
    } else {
      this.setState({ pathname: "/post-job" });
    }
  }

  //   Handling Job Ppost
  handleJobPost(
    jobData,
    startDate,
    endDate,
    imageData,
    uploadedImages,
    currentstage
  ) {
    if (currentstage !== 3) {
      this.handleStageChange(1);
    } else {
      let formData = new FormData();
      this.setState({ dataload: true });
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
      if (uploadedImages && uploadedImages.length !== 0) {
        formData.append("saved_images", JSON.stringify(uploadedImages));
      }
      if (imageData && imageData.length !== 0) {
        for (var key in imageData) {
          if (!Number(imageData[key])) {
            formData.append("file", imageData[key]);
          }
        }
      }
      formData.append("category", this.state.selectedCategory);
      formData.append("jobtitle", jobData.jobtitle);
      formData.append("description", jobData.description);
      if (jobData.budget) {
        formData.append("budget", jobData.budget);
      }
      formData.append("street", jobData.street);
      formData.append("city", jobData.city);
      formData.append("location", jobData.location);
      formData.append("jobStartDate", newStartDate);
      formData.append("jobEndDate", newEndDate);
      formData.append("frequency", jobData.frequency);
      if (this.state.pathname === "/post-job") {
        this.props.createNewJob(formData, callback => {
          if (callback) {
            this.setState({ dataload: false });
            this.props.history.push("/");
          }
        });
      } else {
        formData.append("job_id", this.props.match.params.job_id);
        this.props.updateExistingJob(formData, callback => {
          if (callback) {
            this.setState({ dataload: false });
            this.props.history.push("/job-list");
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
        {this.state.pathname === "/edit-job" &&
          Object.keys(this.props.jobDetails).length && (
            <PostJob
              _jobDetails={this.props.jobDetails}
              _currentstage={this.state.stage}
              _handleStageChange={this.handleStageChange}
              _handleJobPost={this.handleJobPost}
              _handleJobUpdate={this.handleJobUpdate}
              _handleCategoryOnchange={category =>
                this.setState({
                  selectedCategory: category
                })
              }
              _selectedCategory={this.state.selectedCategory}
              path={this.state.pathname}
              dataload={this.state.dataload}
            />
          )}
        {this.state.pathname === "/post-job" && (
          <PostJob
            _currentstage={this.state.stage}
            _handleStageChange={this.handleStageChange}
            _handleJobPost={this.handleJobPost}
            _handleJobUpdate={this.handleJobUpdate}
            _handleCategoryOnchange={category =>
              this.setState({
                selectedCategory: category
              })
            }
            _selectedCategory={this.state.selectedCategory}
            path={this.state.pathname}
            dataload={this.state.dataload}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  jobDetails: state.job.jobDetails
});

const mapDispatchToProps = dispatch => ({
  createNewJob: bindActionCreators(createNewJob, dispatch),
  updateExistingJob: bindActionCreators(updateExistingJob, dispatch),
  getJobDetails: bindActionCreators(getJobDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostNewJob);

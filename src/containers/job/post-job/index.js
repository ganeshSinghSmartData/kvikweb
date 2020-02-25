import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import PostJob from "../../../components/jobs/postJob";
import { getJobCategory } from "./../../../actions/job";
import {
  createNewJob,
  updateExistingJob,
  getJobDetails
} from "./../../../actions/job";
import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import ReviewJob from "../../../components/jobs/postJob/reviewJob/reviewJob";

class PostNewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      pathname: "",
      selectedCategory: "",
      dataload: false,
      previewData: null,
      openView: false,
      uploadedImages: []
      // openPreview: false
    };

    this.handleJobPost = this.handleJobPost.bind(this);
    this.handleJobUpdate = this.handleJobUpdate.bind(this);
    this.handleStageChange = this.handleStageChange.bind(this);
    this.viewJob = this.viewJob.bind(this);
    this._getPagesNumber = this._getPagesNumber.bind(this);
    this.submitJobData = this.submitJobData.bind(this);
  }

  componentDidMount() {
    // document.querySelector("#main_container") &&
    document.querySelector("#main_container").scrollTop = 0;
    this.props.getJobCategory();
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
      this.setState({
        openView: true,
        uploadedImages: uploadedImages,
        previewData: {
          ...jobData,
          startDate,
          endDate,
          imageData,
          uploadedImages,
          job_seeker_id: { ...this.props.user },
          status: "Pending"
        },
        imageData: imageData,
        startDate: startDate,
        endDate: endDate
      });
    }
  }

  //   Handling Job Update
  handleJobUpdate(jobData) {
    // this.props.createNewJob(jobData);
  }

  //   Handling Job Preview
  // openPreviewData() {
  //   this.setState({ openPreview: true });
  // }
  //   Handling Job state change
  handleStageChange(newstage) {
    this.setState({ stage: this.state.stage + newstage });
  }

  //  Set preview Job data
  setPreviewData(data) {
    this.setState({ previewData: data });
  }
  viewJob() {
    this.setState({ testData: 1 });
  }
  _getPagesNumber(numb) {
    this.setState({ stage: numb });
  }
  closePrevieModal = (index) => {
    this.setState({ openView: false, uploadedImages: [] });
  };

  submitJobData() {
    let jobData = this.state.previewData;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let imageData = this.state.imageData;
    let uploadedImages = this.state.uploadedImages;
    let categories = this.props.category;
    this.setState({ openView: false, uploadedImages: [] });
    let formData = new FormData();
    this.setState({ dataload: true });
    const newStartDate = moment(startDate).format("YYYY-MM-DD hh:mm a");
    const newEndDate = moment(endDate).format("YYYY-MM-DD hh:mm a");
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
    formData.append(
      "category",
      this.state.selectedCategory
        ? this.state.selectedCategory
        : categories && categories.length
        ? categories[0].title
        : ""
    );
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
      this.props.createNewJob(formData, (callback) => {
        if (callback) {
          this.setState({ dataload: false });
          this.props.history.push("/");
        }
      });
    } else {
      formData.append("job_id", this.props.match.params.job_id);
      this.props.updateExistingJob(formData, (callback) => {
        if (callback) {
          this.setState({ dataload: false });
          this.props.history.push("/job-list");
        }
      });
    }
  }
  render() {
    let CategoryItems = [];
    this.props.category &&
      this.props.category.length &&
      this.props.category.map((item) => {
        if (item) {
          CategoryItems.push({ name: item.title, value: item.title });
        }
      });
    return (
      <React.Fragment>
        {this.state.openView ? (
          <ReviewJob
            history={this.props.history}
            _jobDetails={this.state.previewData}
            _selectedCategory={this.state.selectedCategory}
            CategoryItems={CategoryItems}
            closePrevieModal={this.closePrevieModal}
            submitJobData={this.submitJobData}
            images={this.state.uploadedImages}
            pagesCount={this._getPagesNumber}
          />
        ) : null}
        {this.state.pathname === "/post-job" && (
          <PostJob
            history={this.props.history}
            _currentstage={this.state.stage}
            _handleStageChange={this.handleStageChange}
            _handleJobPost={this.handleJobPost}
            viewJob={this.viewJob}
            getPagesNumber={this._getPagesNumber}
            _handleJobUpdate={this.handleJobUpdate}
            _handleCategoryOnchange={(category) =>
              this.setState({
                selectedCategory: category
                  ? category.value
                  : this.props.category[0].title
              })
            }
            _selectedCategory={this.state.selectedCategory}
            path={this.state.pathname}
            dataload={this.state.dataload}
            path={this.props.match.path}
            previewData={this.state.previewData}
          />
        )}
        {this.state.pathname === "/edit-job" &&
          (Object.keys(this.props.jobDetails).length ? (
            <PostJob
              _jobDetails={this.props.jobDetails}
              _currentstage={this.state.stage}
              _handleStageChange={this.handleStageChange}
              _handleJobPost={this.handleJobPost}
              _handleJobUpdate={this.handleJobUpdate}
              _handleCategoryOnchange={(category) => {
                this.setState({ selectedCategory: category.value });
              }}
              _selectedCategory={
                this.state.selectedCategory !== ""
                  ? this.state.selectedCategory
                  : this.props.jobDetails.category
              }
              path={this.state.pathname}
              dataload={this.state.dataload}
              path={this.props.match.path}
            />
          ) : (
            <SpinnerOverlay className="position-fixed" />
          ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  jobDetails: state.job.jobDetails,
  category: state.job.category,
  user: state.user.data,
  lang: state.user.lang
});

const mapDispatchToProps = (dispatch) => ({
  createNewJob: bindActionCreators(createNewJob, dispatch),
  updateExistingJob: bindActionCreators(updateExistingJob, dispatch),
  getJobDetails: bindActionCreators(getJobDetails, dispatch),
  getJobCategory: bindActionCreators(getJobCategory, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostNewJob);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Bidder from "../../../components/jobs/bidderProfile";
import { getBidderReview } from "../../../actions/bid";

class BidderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { review: [] };
    this.handleUserActiveJob = this.handleUserActiveJob.bind(this);
    this.handleUserCompletedJob = this.handleUserCompletedJob.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.getBidderReview(
        this.props.match.params.user_id,
        (callback) => {
          if (callback) {
            this.setState({ review: callback });
          } else {
            this.setState({ review: [] });
          }
        }
      );
    }
  }

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
        <Bidder
          user_id={this.props.match.params.user_id}
          review={this.state.review}
        ></Bidder>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  //   activeJobs: state.job.activeJobProduct
  lang: state.user.lang
});

const mapDispatchToProps = (dispatch) => ({
  getBidderReview: bindActionCreators(getBidderReview, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BidderProfile);

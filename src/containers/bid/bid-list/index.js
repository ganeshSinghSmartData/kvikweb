import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Job from "../../../components/jobs/jobs";
import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import {
  getUserActiveBid,
  getUserCompletedBid,
  reset_user_job_details
} from "./../../../actions/bid";

class BidList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleUserCompletedBid = this.handleUserCompletedBid.bind(this);
    this.handleUserActiveBid = this.handleUserActiveBid.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.reset_user_job_details();
    this.props.getUserActiveBid({ page: 1 }, (callback) => {
      if (callback) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });

    this.props.getUserCompletedBid({ page: 1 }, (callback) => {
      if (callback) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  // handleUserNotAcceptedBid
  handleUserCompletedBid = (value) => {
    this.props.getUserCompletedBid({ page: value }, (callback) => {
      if (callback) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  // handleUserActiveBid
  handleUserActiveBid = (value) => {
    this.props.getUserActiveBid({ page: value }, (callback) => {
      if (callback) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <SpinnerOverlay className="position-fixed" />
        ) : (
          <Job
            path={this.props.match.path}
            _handleUserActiveBid={(page) => this.handleUserActiveBid(page)}
            _handleUserCompletedBid={(page) =>
              this.handleUserCompletedBid(page)
            }
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  activeBid: state.bid.activeBid,
  completedBid: state.bid.completedBid
});

const mapDispatchToProps = (dispatch) => ({
  getUserActiveBid: bindActionCreators(getUserActiveBid, dispatch),
  getUserCompletedBid: bindActionCreators(getUserCompletedBid, dispatch),
  reset_user_job_details: bindActionCreators(reset_user_job_details, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BidList);

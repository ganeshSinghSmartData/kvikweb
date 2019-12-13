import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserProfile from "../../../components/jobs/userProfileDetail";

import { getUserDetails, updateUserDetails } from "./../../../actions/user";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._attachDispatch = this._attachDispatch.bind(this);
  }

  componentDidMount() {
    this.props.getUserDetails(this.props.user.data._id);
  }

  _attachDispatch(dispatch) {
    this.formDispatch = dispatch;
  }

  _handleSubmit = params => {
    this.setState({ loading: true });
    this.props.updateUserDetails(params, callback => {
      if (callback) {
        this.setState({ loading: false });
        this.props.history.push("/profile");
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <UserProfile
          path={this.props.match.path === "/edit-profile" ? false : true}
          user={this.props.user.userDetails}
          loading={this.state.loading}
          history={this.props.history}
          handleSubmit={this._handleSubmit}
          attachDispatch={this._attachDispatch}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getUserDetails: bindActionCreators(getUserDetails, dispatch),
  updateUserDetails: bindActionCreators(updateUserDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

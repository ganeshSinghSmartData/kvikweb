import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserProfile from "../../../components/jobs/userProfileDetail";
import Loader from "../../../components/commonUi/loader/loader";

import {
  getUserDetails,
  updateUserDetails,
  uploadUserImage
} from "./../../../actions/user";
import { callbackify } from "util";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      uploading: false
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._attachDispatch = this._attachDispatch.bind(this);
    this._handleImageUpload = this._handleImageUpload.bind(this);
  }

  componentDidMount() {
    this.props.getUserDetails(this.props.user.data._id);
  }

  _attachDispatch(dispatch) {
    this.formDispatch = dispatch;
  }

  _handleImageUpload = file => {
    this.setState({ uploading: true });
    let formData = new FormData();
    formData.append("images", file[0]);
    this.props.uploadUserImage(formData, callback => {
      if (callback) {
        this.setState({ uploading: true });
      }
    });
  };

  _handleSubmit = params => {
    this.setState({ loading: true });
    this.props.updateUserDetails(params, callback => {
      if (callback) {
        this.setState({ loading: false });
        this.props.history.push("/profile");
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <UserProfile
          path={this.props.match.path === "/edit-profile" ? false : true}
          user={this.props.user.userDetails}
          loading={this.state.loading}
          history={this.props.history}
          handleImageUpload={this._handleImageUpload}
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
  updateUserDetails: bindActionCreators(updateUserDetails, dispatch),
  uploadUserImage: bindActionCreators(uploadUserImage, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isEdit: false,
      uploading: false
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleImageUpload = this._handleImageUpload.bind(this);
    this._toggleEdit = this._toggleEdit.bind(this);
  }

  componentDidMount() {
    this.props.getUserDetails(this.props.user.data._id);
  }

  _toggleEdit = val => {
    this.setState({ isEdit: val });
  };

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
        this._toggleEdit(false);
        this.setState({ loading: false });
      } else {
        this._toggleEdit(false);
        this.setState({ loading: false });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Loader loading={this.state.loading} />}
        {Object.keys(this.props.user.userDetails).length > 0 && (
          <UserProfile
            user={this.props.user.userDetails}
            handleImageUpload={this._handleImageUpload}
            isEdit={this.state.isEdit}
            handleSubmit={this._handleSubmit}
            loading={this.state.loading}
            _toggleEdit={this._toggleEdit}
          />
        )}
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

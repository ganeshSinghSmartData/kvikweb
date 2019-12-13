import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserProfile from "../../../components/jobs/userProfileDetail";

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
      loading: false
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
    console.log("file: ", file[0]);
    let formData = new FormData();
    formData.append("images", file[0]);
    this.props.uploadUserImage(formData, callback => {
      if (callback) {
        console.log("ImAGED succesfully updated");
      }
    });
    /* for (var key in file) {
      if (!Number(file[key])) {
        console.log("file[key]: ", file[key]);
        
      }
    } */
  };

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

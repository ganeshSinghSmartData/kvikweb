import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserProfile from "../../../components/jobs/userProfileDetail";

import { getUserDetails } from "./../../../actions/user";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.toggleModal = this.toggleModal.bind(this);
    console.log("props: ", this.props.match.path);
  }

  componentDidMount() {
    this.props.getUserDetails(this.props.user.data._id);
  }

  render() {
    return (
      <React.Fragment>
        <UserProfile
          path={this.props.match.path === "/edit-profile" ? false : true}
          user={this.props.user.userDetails}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getUserDetails: bindActionCreators(getUserDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { registerUser, loginUser } from "./../../actions/user";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {}

  render() {
    return <React.Fragment>User Profile Page</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  /* user: state.user,
    dashboard: state.dashboard */
});

const mapDispatchToProps = dispatch => ({
  /* registerUser: bindActionCreators(registerUser, dispatch),
  loginUser: bindActionCreators(loginUser, dispatch) */
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

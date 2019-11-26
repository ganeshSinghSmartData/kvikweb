/*
 * @file: index.js
 * @description: It is Container dashboard screen .
 * @author: smartData
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import LoginType from "./../../components/commonUi/modal/loginType/loginType";
import SignInModal from "./../../components/commonUi/modal/modal";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {
    console.log("this.props : ", this.props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="black-bg">
          <SignInModal></SignInModal>
        </div>
      </React.Fragment>
    );
  }
}

/* Dashboard.propTypes = {
    user: PropTypes.object.isRequired
  }; */

const mapStateToProps = state => ({
  /* user: state.user,
    dashboard: state.dashboard */
});

const mapDispatchToProps = dispatch => ({
  /* dashboardCounts: bindActionCreators(dashboardCounts, dispatch) */
});

// export default connect(mapStateToProps, mapDispatchToProps)(Register);
export default Auth;

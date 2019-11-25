/*
 * @file: index.js
 * @description: It is Container dashboard screen .
 * @author: smartData
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SignInModal from "./../../components/commonUi/modal/modal";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.showMore = this.showMore.bind(this);
  }

  componentDidMount() {}
  render() {
    return (
      <div className="black-bg">
        <SignInModal isOpen={true}></SignInModal>
      </div>
    );
  }
}

/* Dashboard.propTypes = {
    user: PropTypes.object.isRequired
  }; */

/* const mapStateToProps = state => ({
    user: state.user,
    dashboard: state.dashboard
  });
  
  const mapDispatchToProps = dispatch => ({
    dashboardCounts: bindActionCreators(dashboardCounts, dispatch)
  }); */

// export default connect(mapStateToProps, mapDispatchToProps)(Register);
export default Register;

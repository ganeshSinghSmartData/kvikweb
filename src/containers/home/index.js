import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Job from "./../../components/jobs/jobs";
import SignInModal from "./../../components/commonUi/modal/modal";
import {
  registerUser,
  loginUser,
  forgotPassword,
  changePassword
} from "./../../actions/user";
import { contactUs } from "./../../actions/common";
import SpinnerOverlay from "../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import { socketUrl } from "../../environment";
import SocketClient from "../../config/socket";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      sentForgotEmail: false,
      isLoading: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  componentDidMount() { }

  toggleModal() {
    this.props.history.push("/");
  }

  handleSubmit = values => {
    this.setState({ isLoading: true });
    if (values.lname || values.fname) {
      this.props.registerUser(values, callback => {
        if (callback) {
          this.setState({ isLoading: false });
          SocketClient.init(socketUrl, callback.token, this.props.dispatch);
          this.toggleModal();
        } else {
          this.setState({ isLoading: false });
          this.toggleModal();
        }
      });
    } else if (values.message) {
      this.props.contactUs(values, callback => {
        if (callback) {
          this.setState({ isLoading: false });
          this.props.history.push("/");
        } else {
          this.setState({ isLoading: false });
          this.props.history.push("/");
        }
      });
    } else if (values.forgotemail && !values.confirmPassword) {
      this.props.forgotPassword({ email: values.forgotemail }, callback => {
        if (callback) {
          this.setState({ isLoading: false, sentForgotEmail: true });
        } else {
          this.setState({ isLoading: false });
        }
      });
    } else if (values.confirmPassword) {
      const reqData = {
        otp: values.otp,
        email: values.forgotemail,
        password: values.newpassword,
        confirmPassword: values.confirmPassword
      };
      this.props.changePassword(reqData, callback => {
        if (callback) {
          this.setState({ isLoading: false, sentForgotEmail: false });
          this.toggleModal();
        } else {
          this.setState({ isLoading: false, sentForgotEmail: false });
          // this.toggleModal();
        }
      });
    } else {
      this.props.loginUser(values, callback => {
        if (callback) {
          this.setState({ isLoading: false });
          SocketClient.init(socketUrl, callback.token, this.props.dispatch);
          this.toggleModal();
        } else {
          this.setState({ isLoading: false });
          // this.toggleModal();
        }
      });
    }
  };

  handleForgotPassword = values => { };

  handleSocialLogin = user => {
    console.log(user);
  };

  handleSocialLoginFailure = err => {
    console.error("social error =====>", err);
  };

  render() {
    const path = this.props.location.pathname;
    return (
      <React.Fragment>
        {true ? <Job /> : <SpinnerOverlay className="position-fixed" />}

        <div>
          <SignInModal
            _isOpen={
              path === "/register" ||
              path === "/login" ||
              path === "/about-us" ||
              path === "/contact-us"
            }
            _toggleModal={this.toggleModal}
            _modalType={path === "/contact-us" ? "Contact Us" : path}
            _loading={this.state.isLoading}
            _sentForgotEmail={this.state.sentForgotEmail}
            _handleSubmit={this.handleSubmit}
            _handleForgotPassword={this.handleForgotPassword}
            handleSocialLogin={this.handleSocialLogin}
            handleSocialLoginFailure={this.handleSocialLoginFailure}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  /* user: state.user,
    dashboard: state.dashboard */
});

const mapDispatchToProps = dispatch => ({
  registerUser: bindActionCreators(registerUser, dispatch),
  loginUser: bindActionCreators(loginUser, dispatch),
  forgotPassword: bindActionCreators(forgotPassword, dispatch),
  changePassword: bindActionCreators(changePassword, dispatch),
  contactUs: bindActionCreators(contactUs, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

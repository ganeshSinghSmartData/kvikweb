import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Job from "./../../components/jobs/jobs";
import SignInModal from "./../../components/commonUi/modal/modal";
import { registerUser, loginUser } from "./../../actions/user";
import { socketUrl } from '../../environment';
import SocketClient from '../../config/socket';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false
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
    if (values.lname || values.fname) {
      this.props.registerUser(values, callback => {
        if (callback) {
          SocketClient.init(socketUrl, callback.token, this.props.dispatch);
          this.toggleModal();
        }
      });
    } else {
      this.props.loginUser(values, callback => {
        if (callback) {
          SocketClient.init(socketUrl, callback.token, this.props.dispatch);
          this.toggleModal();
        }
      });
    }
  };

  handleForgotPassword = values => {
    console.log("Handling forgot password feature");
  };

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
        <Job />
        <div>
          <SignInModal
            _isOpen={path === "/register" || path === "/login"}
            _toggleModal={this.toggleModal}
            _modalType={path}
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
  loginUser: bindActionCreators(loginUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

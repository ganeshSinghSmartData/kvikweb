import React, { Component } from "react";
import Job from "./../../components/jobs/jobs";
import SignInModal from "./../../components/commonUi/modal/modal";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {}

  toggleModal = value => {
    this.props.history.push("/");
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
  /* dashboardCounts: bindActionCreators(dashboardCounts, dispatch) */
});

export default Home;

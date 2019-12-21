import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getCustomPageDetails } from "../../../actions/common";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("235456454564564654564644");
    console.log("{this.props.about_us_details : ", this.props.about_us_details);
  }

  componentDidMount() {
    console.log("Herekjnsdkf iopdfsjgoidfsoguoisdfg i");

    this.props.getCustomPageDetails("about_us", callback => {
      if (callback) {
        console.log(" I m in about us callback");
      } else {
        console.log(" I m in about us callback false");
      }
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <React.Fragment>
        {this.props.about_us_details &&
        this.props.about_us_details.description ? (
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.about_us_details.description
            }}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  about_us_details: state.common.about_us_details
});

const mapDispatchToProps = dispatch => ({
  getCustomPageDetails: bindActionCreators(getCustomPageDetails, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
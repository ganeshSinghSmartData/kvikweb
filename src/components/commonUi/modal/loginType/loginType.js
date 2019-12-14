import React from "react";

import "./loginType.scss";
import SocialButton from "../../social-button";
const LoginType = props => {
  return (
    <div className="login-type login-type text-center">
      {/*       <h4>or Login Using Social Media</h4>
      <div className="login-type-list">
        <SocialButton
          provider="facebook"
          appId="369320740685834"
          onLoginSuccess={props.handleSocialLogin}
          onLoginFailure={props.handleSocialLoginFailure}
        >
        </SocialButton>
      </div> */}
    </div>
  );
};

export default LoginType;

import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { LocalForm, Control } from "react-redux-form";
import { Link } from "react-router-dom";

import Checkbox from "../checkbox/checkbox";
import Logo from "../../commonUi/logo/logo";
import LoginType from "./loginType/loginType";
import InputCell from "./../input/inputCell";

import "./modal.scss";

const SignInModal = ({
  _isOpen,
  _toggleModal,
  _modalType,
  _handleSubmit,
  _handleForgotPassword,
  ...props
}) => {
  return (
    <div>
      <Modal
        isOpen={_isOpen}
        size="lg"
        className={
          "d-flex flex-column align-items-center justify-content-center " +
          (_modalType ? "signup" : "")
        }
      >
        <Button
          color="link"
          className="position-absolute close-btn secondary-100-hover"
          onClick={() => _toggleModal()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
            <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
          </svg>
        </Button>
        <ModalBody className={"overflow-auto " + (_modalType ? "p-0" : "")}>
          <div className="signup-modal-blc d-flex">
            <div className="signup-modal-pic d-flex align-items-center justify-content-center position-relative">
              <span className="curl position-absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="53.005"
                  height="245.634"
                  viewBox="0 0 53.005 245.634"
                >
                  <path
                    id="Shape_1"
                    data-name="Shape 1"
                    d="M679.7,250.128C661.9,338.756,627,344.316,627,344.316s52.729,37.911,52.7,124.855S680.4,157.336,679.7,250.128Z"
                    transform="translate(-627 -236.026)"
                    fill="#fff"
                  />
                </svg>
              </span>
              <h3 className="text-center position-relative">
                Welcome to
                <span className="d-block">
                  <Logo className="signup-logo" />
                </span>
              </h3>
            </div>

            <div className="signup-modal-frm flex-fill">
              <LocalForm onSubmit={values => _handleSubmit(values)}>
                {_modalType === "/register" && (
                  <React.Fragment>
                    <h2>
                      Welcome <label className="d-block">Sign Up</label>
                    </h2>
                    <InputCell
                      Name={"fname"}
                      Placeholder={"First Name"}
                      Model=".fname"
                      InputType={"text"}
                    />
                    <InputCell
                      Name={"lname"}
                      Placeholder={"Last Name"}
                      Model=".lname"
                      InputType={"text"}
                    />
                    <InputCell
                      Name={"email"}
                      Placeholder={"Email"}
                      Model=".email"
                      InputType={"email"}
                    />
                    <InputCell
                      Name={"password"}
                      Placeholder={"Password"}
                      Model=".password"
                      InputType={"password"}
                    />
                    <div className="signup-agree d-flex align-items-start">
                      <label className="d-flex align-items-start">
                        <Checkbox /> I agree with terms and conditions
                      </label>
                    </div>
                    <div className="text-center">
                      <Button size="lg" className="signup">
                        SIGN UP
                      </Button>
                    </div>
                  </React.Fragment>
                )}
                {_modalType === "/login" && (
                  <div>
                    <h2>
                      Welcome Back, <label className="d-block">Login</label>
                    </h2>
                    <InputCell
                      Name={"email"}
                      Placeholder={"Email"}
                      Model=".email"
                      InputType={"email"}
                    />
                    <InputCell
                      Name={"password"}
                      Placeholder={"Password"}
                      Model=".password"
                      InputType={"password"}
                    />
                    <div className="signup-agree d-flex align-items-start">
                      <label className="d-flex align-items-start">
                        <Checkbox /> Remember me
                      </label>
                      <Button
                        color="link"
                        className="forgot-btn btn btn-link flex-shrink-0 ml-auto p-0 text-primary-hover"
                        onClick={_handleForgotPassword("")}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                    <div className="text-center">
                      <Button size="lg" className="signup">
                        LOGIN
                      </Button>
                    </div>
                    <LoginType {...props} />
                    <p className="signup-link-rw text-center">
                      <span>Don't have an account?</span>
                      <Link to={"/register"}>
                        Sign Up Now
                      </Link>
                    </p>
                  </div>
                )}
              </LocalForm>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default SignInModal;

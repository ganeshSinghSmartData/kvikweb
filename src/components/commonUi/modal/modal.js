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
          <svg
            id="cancel"
            xmlns="http://www.w3.org/2000/svg"
            width="475.2"
            height="475.2"
            viewBox="0 0 475.2 475.2"
          >
            <g id="Group_1" data-name="Group 1">
              <path
                id="Path_1"
                data-name="Path 1"
                d="M405.6,69.6a237.588,237.588,0,1,0-336,336,237.588,237.588,0,1,0,336-336ZM386.5,386.5a210.519,210.519,0,0,1-297.8,0C6.6,304.4,6.6,170.8,88.7,88.7a210.519,210.519,0,0,1,297.8,0C468.6,170.8,468.6,304.4,386.5,386.5Z"
              />
              <path
                id="Path_2"
                data-name="Path 2"
                d="M342.3,132.9a13.46,13.46,0,0,0-19.1,0l-85.6,85.6L152,132.9A13.506,13.506,0,1,0,132.9,152l85.6,85.6-85.6,85.6a13.55,13.55,0,0,0,9.5,23.1,13.173,13.173,0,0,0,9.5-4l85.6-85.6,85.6,85.6a13.588,13.588,0,0,0,9.5,4,13.01,13.01,0,0,0,9.5-4,13.46,13.46,0,0,0,0-19.1l-85.4-85.6L342.3,152A13.46,13.46,0,0,0,342.3,132.9Z"
              />
            </g>
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
                      className="input-icon-cell"
                      InputIcon={true}
                      Errors={{ required: "required" }}
                    />
                    <InputCell
                      Name={"lname"}
                      Placeholder={"Last Name"}
                      Model=".lname"
                      InputType={"text"}
                      className="input-icon-cell"
                      InputIcon={true}
                      Errors={{ required: "required" }}
                    />
                    <InputCell
                      Name={"email"}
                      Placeholder={"Email"}
                      Model=".email"
                      InputType={"email"}
                      className="input-icon-cell"
                      InputIcon={true}
                      Errors={{
                        required: "required",
                        invalidEmail: "invalidEmail"
                      }}
                    />
                    <InputCell
                      Name={"password"}
                      Placeholder={"Password"}
                      Model=".password"
                      InputType={"password"}
                      className="input-icon-cell"
                      InputIcon={true}
                      Errors={{ required: "required" }}
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
                      className="input-icon-cell"
                      InputIcon={true}
                      Errors={{ required: "required" }}
                    />
                    <InputCell
                      Name={"password"}
                      Placeholder={"Password"}
                      Model=".password"
                      InputType={"password"}
                      className="input-icon-cell"
                      InputIcon={true}
                      Errors={{ required: "required" }}
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
                      <Link className="text-black" to={"/register"}>
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

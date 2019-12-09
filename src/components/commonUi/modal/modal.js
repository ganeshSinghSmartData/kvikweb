import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { LocalForm, Control } from "react-redux-form";
import { Link } from "react-router-dom";

import Checkbox from "../checkbox/checkbox";
import Logo from "../../commonUi/logo/logo";
import LoginType from "./loginType/loginType";
import InputCell from "./../input/inputCell";
import RatingBlock from "../../jobs/ratingBock/ratingBlock";
import UserImage from "../../jobs/jobDetail/userImage/userImage";

import "./modal.scss";

const SignInModal = ({
  _isOpen,
  _toggleModal,
  _modalType,
  _handleSubmit,
  _handleForgotPassword,
  ...props
}) => {
  let customClass = "";
  if (_modalType === "/register" || _modalType === "/login") {
    customClass = "signup";
  } else if (_modalType === "Place your bid") {
    customClass = "bid-modal secondary-font-family";
  }

  return (
    <div>
      <Modal isOpen={_isOpen} size="lg" className={"d-flex flex-column align-items-center justify-content-center " + { customClass }}>
        {(_modalType === "/register" || _modalType === "/login") ? (<Button color="link" className="position-absolute close-btn" onClick={() => _toggleModal()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357"><path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" /></svg>
        </Button>) : (
            <ModalHeader>
              <span>{_modalType}</span>
              <Button color="link" className="close-btn btn2" onClick={_toggleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
                  <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
                </svg>
              </Button>
            </ModalHeader>
          )}
        <ModalBody className={"overflow-auto " + ((_modalType === "/register" || _modalType === "/login") ? "p-0" : "")}>
          {(_modalType === "/register" || _modalType === "/login") && (<div className="signup-modal-blc d-flex">
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
                      ClassName="input-icon-cell"
                      InputIcon={true}
                      Errors={{ required: "required" }}
                    />
                    <InputCell
                      Name={"lname"}
                      Placeholder={"Last Name"}
                      Model=".lname"
                      InputType={"text"}
                      ClassName="input-icon-cell"
                      InputIcon={true}
                      Errors={{ required: "required" }}
                    />
                    <InputCell
                      Name={"email"}
                      Placeholder={"Email"}
                      Model=".email"
                      InputType={"email"}
                      ClassName="input-icon-cell"
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
                      ClassName="input-icon-cell"
                      InputIcon={true}
                      Errors={{
                        required: "required",
                        invalidPass: "invalidPass"
                      }}
                    />
                    {/* <div className="signup-agree d-flex align-items-start">
                      <label className="d-flex align-items-start">
                        <Checkbox /> I agree with terms and conditions
                      </label>
                    </div> */}
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
                      ClassName="input-icon-cell"
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
                      ClassName="input-icon-cell"
                      InputIcon={true}
                      Errors={{
                        required: "required",
                        invalidPass: "invalidPass"
                      }}
                    />
                    <div className="signup-agree d-flex align-items-start">
                      <label className="d-flex align-items-start">
                        <Checkbox /> Remember me
                      </label>
                      <Button
                        type="button"
                        color="link"
                        className="forgot-btn btn btn-link flex-shrink-0 ml-auto p-0 text-primary-hover"
                        onClick={_handleForgotPassword("")}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                    <div className="text-center">
                      <Button type="submit" size="lg" className="signup">
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
          </div>)}


          {(_modalType === "Place your bid") && (<div className="bid-desc-blc">
            <LocalForm onSubmit={values => _handleSubmit(values)}>
              <div className="row bid-desc-frm">
                <div className="col-md-12">
                  <label className="input-title">Description</label>
                  <InputCell
                    Name={"description"}
                    Placeholder={"Description"}
                    Model=".description"
                    InputType={"textarea"}
                    Errors={{ required: "required" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="input-title">Bid Amount</label>
                  <InputCell
                    Name={"bid_amount"}
                    Placeholder={"Bid Amount"}
                    Model=".bid_amount"
                    InputType={"number"}
                    Errors={{ required: "required" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="input-title">Frequency</label>
                  <InputCell
                    Name={"frequency"}
                    Model=".frequency"
                    InputType="select"
                    Placeholder={"Frequency"}
                    Errors={{ required: "required" }}
                  />
                </div>
              </div>
              <div className="bid-frm-btns text-center">
                {(_modalType !== "Place your bid") && (<Button color="link" className="btn-dark">REJECT</Button>)}
                {(_modalType === "Place your bid") && (<Button color="secondary">SEND</Button>)}
              </div>
            </LocalForm>
          </div>)}
        </ModalBody>
      </Modal>

      {/* <Modal isOpen={modal} toggle={toggle} size="lg"
        className={"d-flex flex-column align-items-center   justify-content-center bid-modal secondary-font-family"}>
        <ModalHeader>
          <span>Modal title</span>
          <Button color="link" className="close-btn btn2" onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
              <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
            </svg>
          </Button>
        </ModalHeader>
        <ModalBody className={"overflow-auto"}>
          <div className="bid-desc-blc">
            <h2>Description</h2>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur.</p>

            <form>
              <div className="row bid-desc-frm">
                <div className="col-md-6">
                  <InputCell Name={"amount1"}
                    Placeholder={"amount"}
                    Model=".amount1"
                    InputType={"text"}
                    className="input-line-blc"
                    Errors={{ required: "required" }}
                  />
                </div>
                <div className="col-md-6">
                  <InputCell Name={"amount2"}
                    Placeholder={"amount"}
                    Model=".amount2"
                    InputType={"text"}
                    className="input-line-blc"
                    Errors={{ required: "required" }}
                  />
                </div>
              </div>
              <div className="bid-frm-btns text-center">
                <Button color="link" className="btn-dark">REJECT</Button>
                <Button color="secondary">SEND</Button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
                */}

      {/*
      <Modal isOpen={modal} toggle={toggle} size="lg" className={"d-flex flex-column align-items-center justify-content-center bid-modal secondary-font-family"}>
        <ModalHeader>
          <span>Bid Details</span>
          <Button color="link" className="close-btn btn2" onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
              <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
            </svg>
          </Button>
        </ModalHeader>
        <ModalBody className={"overflow-auto"}>
          <div className="bid-detail-blc d-flex">
            <div className="bid-detail-l">
              <UserImage />
            </div>
            <div className="bid-detail-r">
              <div className="bid-detail-rw">
                <h2>
                  Jorden Luise
                <span>1 Day Ago</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur.
                </p>
                <div className="bid-price">
                  $ 650.00
                </div>
              </div>
              <div className="bid-frm-btns text-center">
                <Button color="link" className="btn-dark">REJECT</Button>
                <Button color="secondary">SEND</Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      */}

      {/*
        <Modal isOpen={modal} toggle={toggle} size="lg" className={"d-flex flex-column align-items-center justify-content-center confirm-modal secondary-font-family"}>
        <ModalHeader>
          <span>Confirmation</span>
          <Button color="link" className="close-btn btn2" onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
              <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
            </svg>
          </Button>
        </ModalHeader>
        <ModalBody className={"overflow-auto"}>
          <div className="bid-confirm-blc text-center">
            <h2 className="text-primary">The job request has been accepted by </h2>
            <h3>Joseph Allison</h3>
            <div className="bid-confirm-btns d-flex flex-column align-items-center">
              <Button color="secondary" className="start-job-btn">START JOB</Button>
              <Button color="link">Remind me later</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
        */}

      {/* <Modal isOpen={modal} toggle={toggle} size="lg" className={"d-flex flex-column align-items-center justify-content-center confirm-modal bidder-completion secondary-font-family"}>
        <ModalHeader className="border-0">
          <Button color="link" className="close-btn btn2" onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
              <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
            </svg>
          </Button>
        </ModalHeader>
        <ModalBody className={"overflow-auto"}>
          <div className="bid-confirm-blc bidder-completion-blc text-center">
            <div className="bidder-label">
              Joseph Allison
            </div>
            <h2 className="text-primary">Has been completed the job</h2>
            <h3>Tap a star to rate him</h3>
            <div className="bidder-rate d-flex justify-content-center">
              <RatingBlock />
            </div>
            <div className="bid-confirm-btns d-flex flex-column align-items-center">
              <Button color="link">Remind me later</Button>
            </div>
          </div>
        </ModalBody>
      </Modal> */}

      {/*
      <Modal isOpen={modal} toggle={toggle} size="lg" className={"d-flex flex-column align-items-center justify-content-center bid-modal secondary-font-family"}>
        <ModalHeader>
          <span>Payment Completed</span>
          <Button color="link" className="close-btn btn2" onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
              <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
            </svg>
          </Button>
        </ModalHeader>
        <ModalBody className={"overflow-auto"}>
          <div className="bid-detail-blc d-flex">
            <div className="bid-detail-l">
              <UserImage />
            </div>
            <div className="bid-detail-r">
              <div className="bid-detail-rw">
                <h2>
                  Jorden Luise
                <span>1 Day Ago</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur.
                </p>
                <div className="bid-price">
                  $ 650.00
                </div>
              </div>
              <div className="bid-frm-btns text-center">
                <Button color="link" className="btn-dark">REJECT</Button>
                <Button color="secondary">SEND</Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      */}
    </div>
  );
};
export default SignInModal;

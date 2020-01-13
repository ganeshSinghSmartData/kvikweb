import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";

import Logo from "../../commonUi/logo/logo";
import LoginType from "./loginType/loginType";
import InputCell from "./../input/inputCell";
import RatingBlock from "../../jobs/ratingBock/ratingBlock";
import UserImage from "../../jobs/jobDetail/userImage/userImage";
import Spinner from "../../commonUi/spinner/spinner";

import "./modal.scss";

const SignInModal = ({
  _isOpen,
  _toggleModal,
  _modalType,
  _jobProviderName = "",
  _bidderName = "",
  _handleSubmit,
  _handleForgotPassword,
  _loading = false,
  ...props
}) => {
  let customClass = "";
  let headerClass = "";
  if (_modalType === "/register" || _modalType === "/login") {
    customClass = "signup";
  } else if (_modalType === "Place your bid" || _modalType === "Bid Details") {
    customClass = "bid-modal secondary-font-family";
  } else if (_modalType === "Contact Us") {
    customClass = "contact-us-modal";
  } else if (_modalType === "Confirmation") {
    customClass = "confirm-modal bidder-completion secondary-font-family";
  } else if (_modalType === "Rate Bidder") {
    customClass = "confirm-modal bidder-completion secondary-font-family";
    headerClass = "border-0";
  }

  let [isForgot, setForgot] = useState(false);
  let [bidderRating, setBidderrating] = useState(1);

  return (
    <div>
      <Modal
        isOpen={_isOpen}
        size="lg"
        className={
          "d-flex flex-column align-items-center justify-content-center " +
          customClass
        }
      >
        {_loading && (
          <Spinner className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center with-overlay overlay-opacity" />
        )}
        {_modalType === "/register" || _modalType === "/login" ? (
          <Button
            color="link"
            className="position-absolute close-btn"
            onClick={() => {
              setForgot(false);
              _toggleModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="357"
              height="357"
              viewBox="0 0 357 357"
            >
              <path
                id="Forma_1"
                data-name="Forma 1"
                d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z"
              />
            </svg>
          </Button>
        ) : (
            <ModalHeader className={`${headerClass}`}>
              {headerClass === "" && <span>{_modalType}</span>}
              <Button
                color="link"
                className="close-btn btn2"
                onClick={_toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="357"
                  height="357"
                  viewBox="0 0 357 357"
                >
                  <path
                    id="Forma_1"
                    data-name="Forma 1"
                    d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z"
                  />
                </svg>
              </Button>
            </ModalHeader>
          )}
        <ModalBody
          className={
            "overflow-auto " +
            (_modalType === "/register" || _modalType === "/login" ? "p-0" : "")
          }
        >
          {(_modalType === "/register" || _modalType === "/login") && (
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
                <h3 className="text-center position-relative mb0">
                  Welcome to
                  <span className="d-block">
                    <Logo classname="signup-logo" navigate={false} />
                  </span>
                </h3>
              </div>

              <div className="signup-modal-frm flex-fill">
                <LocalForm onSubmit={values => _handleSubmit(values)}>
                  {_modalType === "/register" && (
                    <React.Fragment>
                      <h2>
                        <label className="d-block">Sign Up</label>
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
                  {_modalType === "/login" && !isForgot && (
                    <div>
                      <h2>
                        <label className="d-block">Login</label>
                      </h2>
                      <InputCell
                        Name={"email"}
                        Placeholder={"Email"}
                        Model=".email"
                        InputType={"email"}
                        ClassName="input-icon-cell"
                        InputIcon={true}
                        Errors={{
                          required: "required"
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
                          required: "required"
                        }}
                      />
                      <div className="signup-agree d-flex align-items-start">
                        {/* <label className="d-flex align-items-start">
                          <Checkbox /> Remember me
                        </label> */}
                        <Button
                          type="button"
                          color="link"
                          className="forgot-btn btn btn-link flex-shrink-0 ml-auto p-0 text-primary-hover"
                          onClick={() => setForgot(true)}
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
                  {_modalType === "/login" && isForgot && (
                    <div>
                      <h2>
                        <label className="d-block">Forgot Password</label>
                      </h2>
                      {!props._sentForgotEmail && (
                        <InputCell
                          Name={"email"}
                          Placeholder={"Email"}
                          Model=".forgotemail"
                          InputType={"email"}
                          ClassName="input-icon-cell"
                          InputIcon={true}
                          Errors={{
                            required: "required"
                          }}
                        />
                      )}
                      {props._sentForgotEmail && (
                        <>
                          <InputCell
                            Name={"otp"}
                            Placeholder={"OTP"}
                            Model=".otp"
                            InputType={"text"}
                            ClassName="input-icon-cell"
                            InputIcon={true}
                            Errors={{
                              required: "required"
                            }}
                          />
                          <InputCell
                            Name={"password"}
                            Placeholder={"Password"}
                            Model=".newpassword"
                            InputType={"password"}
                            ClassName="input-icon-cell"
                            InputIcon={true}
                            Errors={{
                              required: "required",
                              invalidPass: "invalidPass"
                            }}
                          />
                          <InputCell
                            Name={"confirmPassword"}
                            Placeholder={"Confirm Password"}
                            Model=".confirmPassword"
                            InputType={"password"}
                            ClassName="input-icon-cell"
                            InputIcon={true}
                            Errors={{
                              required: "required",
                              invalidPass: "invalidPass"
                            }}
                          />
                        </>
                      )}
                      <div className="signup-agree d-flex align-items-start">
                        <Button
                          type="button"
                          color="link"
                          className="forgot-btn btn btn-link flex-shrink-0 ml-auto p-0 text-primary-hover"
                          onClick={() => setForgot(false)}
                        >
                          Login?
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button type="submit" size="lg" className="signup">
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                </LocalForm>
              </div>
            </div>
          )}

          {_modalType === "Place your bid" && (
            <div className="bid-desc-blc">
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
                      Disabled={true}
                      DefaultValue={props._frequency}
                      Errors={{ required: "required" }}
                    />
                  </div>
                </div>
                <div className="bid-frm-btns text-center">
                  {_modalType !== "Place your bid" && (
                    <Button color="link" className="btn-dark">
                      REJECT
                    </Button>
                  )}
                  {_modalType === "Place your bid" && (
                    <Button color="secondary">SEND</Button>
                  )}
                </div>
              </LocalForm>
            </div>
          )}

          {_modalType === "Bid Details" && (
            <React.Fragment>
              {!props._acceptProposal && (
                <div className="bid-detail-blc d-flex">
                  <div className="bid-detail-l">
                    <UserImage />
                  </div>
                  <div className="bid-detail-r flex-fill">
                    <div className="bid-detail-rw">
                      <h2>
                        <Link
                          className="user-detail-link"
                          to={`/bidder-profile/${props._propsDetails.job_provider_id._id}`}
                        >
                          {`${props._propsDetails.job_provider_id.fname} ${props._propsDetails.job_provider_id.lname}`}
                        </Link>
                        <span>{props._propsDetails.daysfrom} Day Ago</span>
                      </h2>
                      <p>{props._propsDetails.description}</p>
                      <div className="bid-price">
                        $ {props._propsDetails.bid_amount}
                      </div>
                    </div>
                    {props._propsDetails.status === "not_started" && (
                      <div className="bid-frm-btns d-flex justify-content-center">
                        <Button
                          color="link"
                          className="btn-dark cancel"
                          onClick={() =>
                            props._hadleReject(props._propsDetails)
                          }
                        >
                          REJECT
                        </Button>
                        <Button color="secondary" onClick={props._handleAccept}>
                          ACCEPT
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {props._acceptProposal && (
                <div className="payment-confirm-blc flex-fill">
                  {!props._cards || props._cards.length === 0 ? (
                    <div className="no-card-blc text-center d-flex justify-content-center align-items-center">
                      <div className="no-card-msg">
                        No Card Added yet!!
                        <p className="">
                          <Link
                            className="btn btn-secondary"
                            color="secondary"
                            to={"/profile"}
                          >
                            Add Payment Card
                          </Link>
                        </p>
                      </div>
                    </div>
                  ) : (
                      <React.Fragment>
                        <h2>
                          <strong>Card Holder:</strong>
                          {props._cardHolderName}
                        </h2>
                        <div className="payment-card-list d-flex flex-column flex-wrap">
                          <ul className="row">
                            {props._cards.map((item, key) => {
                              return (
                                <li key={key}>
                                  <div className="payment-confirm position-relative">
                                    <label className="payment-confirm-check d-flex align-items-center justify-content-center ">
                                      <input
                                        type="radio"
                                        name="select-option"
                                        checked="checked"
                                        onChange={() => props._selectedCard(item)}
                                        className="position-absolute"
                                      />
                                      <span className="card-check-cell">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="78.775"
                                          height="57.775"
                                          viewBox="0 0 78.775 57.775"
                                        >
                                          <path
                                            id="Forma_1"
                                            data-name="Forma 1"
                                            d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z"
                                            transform="translate(-0.111 -0.114)"
                                          />
                                        </svg>
                                      </span>
                                    </label>
                                    <div className="form-group payment-confirm-rw">
                                      <label>Card Number</label>
                                      <div className="card-confirm-pic-rw d-flex">
                                        <div className="card-confirm-pic d-flex justify-content-center align-items-center">
                                          {item.type === "visa" && (
                                            <img
                                              src={require("../../../assets/images/icons/payment-icon/visa.svg")}
                                              alt="Visa Card"
                                            />
                                          )}
                                        </div>
                                        <div className="card-confirm-col flex-fill">
                                          <input
                                            type="email"
                                            disabled
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder={item.cardNumber}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group payment-confirm-rw d-flex">
                                      <div className="payment-confirm-col flex-fill">
                                        <label for="exampleFormControlInput1">
                                          Expiration Date
                                      </label>
                                        <input
                                          type="email"
                                          disabled
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder={item.cardValidity}
                                        />
                                      </div>
                                      <div className="payment-confirm-col flex-fill cvv">
                                        <label for="exampleFormControlInput1">
                                          CVV
                                      </label>
                                        <input
                                          type="email"
                                          disabled
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder={item.cardCvv}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="bid-frm-btns text-center">
                          <Button
                            color="secondary"
                            type="button"
                            onClick={props._makePayment}
                          >
                            Make Payment
                        </Button>
                        </div>
                      </React.Fragment>
                    )}
                </div>
              )}
            </React.Fragment>
          )}

          {_modalType === "Contact Us" && (
            <div className="contact-us-blc">
              <LocalForm onSubmit={values => _handleSubmit(values)}>
                <div className="contact-us-frm">
                  <InputCell
                    Name={"name"}
                    Placeholder={"Name"}
                    Model=".name"
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
                    Name={"message"}
                    Placeholder={"Message"}
                    Model=".message"
                    InputType={"textarea"}
                    InputIcon={true}
                    Errors={{ required: "required" }}
                  />
                </div>
                <div className="contact-us-btm text-left">
                  <Button color="primary">Submit</Button>
                </div>
              </LocalForm>
            </div>
          )}

          {_modalType === "Confirmation" && (
            <ModalBody className={"overflow-auto"}>
              <div className="bid-confirm-blc text-center">
                <h2 className="text-primary">
                  The job request has been accepted by{" "}
                </h2>
                <h3>{_jobProviderName}</h3>
                <div className="bid-confirm-btns d-flex flex-column align-items-center">
                  <Button
                    color="secondary"
                    className="start-job-btn"
                    onClick={() => props.startJob()}
                  >
                    START JOB
                  </Button>
                  <Button color="link" onClick={() => _toggleModal()}>
                    Remind me later
                  </Button>
                </div>
              </div>
            </ModalBody>
          )}

          {_modalType === "Rate Bidder" && (
            <div className="bid-confirm-blc bidder-completion-blc text-center">
              <div className="bidder-label">{_bidderName}</div>
              <h2 className="text-primary">Has been completed the job</h2>
              <h3>Tap a star to rate him</h3>
              <div className="bidder-rate d-flex justify-content-center">
                <RatingBlock
                  disablestar={false}
                  ratingClick={rate => setBidderrating(rate)}
                />
              </div>
              <div className="rating-desc">
                <LocalForm
                  onSubmit={values => _handleSubmit(values, bidderRating)}
                >
                  <div className="rating-desc-rw">
                    <InputCell
                      Name={"reveiw"}
                      Placeholder={"Reveiw"}
                      Model=".reveiw"
                      InputType={"textarea"}
                      Errors={{ required: "required" }}
                    />
                  </div>
                  <div className="bid-confirm-btns rating-desc-rw text-center">
                    <Button color="secondary" className="start-job-btn">
                      SUBMIT
                    </Button>
                  </div>
                </LocalForm>
              </div>
              <div className="bid-confirm-btns d-flex flex-column align-items-center">
                <Button color="link" onClick={() => _toggleModal()}>
                  Remind me later
                </Button>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>


      {/* metric-modal start */}
      {/* <Modal isOpen={modal2} toggle={toggle2} className="metric-modal">
        <ModalHeader toggle={toggle2}>User Metrics</ModalHeader>
        <ModalBody>
          <div className="metric-block d-flex flex-wrap">
            <Button color="link" className="metric-btn d-flex flex-column align-items-center">
              <span className="metric-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="480" height="432" viewBox="0 0 480 432">
                  <path id="suitcase" d="M456,72H352V40A40.047,40.047,0,0,0,312,0H168a40.047,40.047,0,0,0-40,40V72H24A24,24,0,0,0,0,96V274.078a24.1,24.1,0,0,0,16,22.586V408a24,24,0,0,0,24,24H440a24,24,0,0,0,24-24V296.672a24.113,24.113,0,0,0,16-22.594V96A24,24,0,0,0,456,72ZM144,40a24,24,0,0,1,24-24H312a24,24,0,0,1,24,24V72H320V40a8,8,0,0,0-8-8H168a8,8,0,0,0-8,8V72H144ZM304,72H176V48H304ZM448,408a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V299.414l176,24.273V344a24,24,0,0,0,24,24h16a24,24,0,0,0,24-24V323.688l176-24.273ZM256,344a8,8,0,0,1-8,8H232a8,8,0,0,1-8-8V296a8,8,0,0,1,8-8h16a8,8,0,0,1,8,8Zm208-69.922a8,8,0,0,1-6.879,7.93l-2.219.3L272,307.535V296a24,24,0,0,0-24-24H232a24,24,0,0,0-24,24v11.535L22.887,282.008A8,8,0,0,1,16,274.078V96a8,8,0,0,1,8-8H456a8,8,0,0,1,8,8Zm0,0" />
                </svg>
              </span>
              <label className=" d-flex flex-column">
                Job Completed
              <span>
                  5000
              </span>

              </label>
              <span className="metric-view-btn mt-auto">
                View All
              </span>
            </Button>
            <Button color="link" className="metric-btn d-flex flex-column align-items-center">
              <span className="metric-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="479.779" height="479.976" viewBox="0 0 479.779 479.976">
                  <g id="auction2" transform="translate(-0.098)">
                    <g id="Group_2" data-name="Group 2">
                      <g id="Group_1" data-name="Group 1">
                        <path id="Path_1" data-name="Path 1" d="M279.339,144.016a40,40,0,0,0-39.24-32.04,24,24,0,1,1,24-24h16a40.072,40.072,0,0,0-32-39.2v-16.8h-16v16.8a40,40,0,0,0,8,79.2,24,24,0,1,1-24,24h-16a40.072,40.072,0,0,0,32,39.2v16.8h16v-16.8A40,40,0,0,0,279.339,144.016Z" />
                      </g>
                    </g>
                    <g id="Group_4" data-name="Group 4">
                      <g id="Group_3" data-name="Group 3">
                        <path id="Path_2" data-name="Path 2" d="M360.1,119.976a120,120,0,1,0-144,117.6v82.4h-8A8,8,0,0,0,202.786,322l-72,64a8,8,0,0,0-2.688,5.976v80a8,8,0,0,0,8,8h152a23.9,23.9,0,0,0,17.76-40,23.633,23.633,0,0,0,0-32,23.633,23.633,0,0,0,0-32,23.9,23.9,0,0,0-17.76-40h-9.472A24,24,0,0,0,264.1,321.448V237.576A120.2,120.2,0,0,0,360.1,119.976Zm-120,268v-20h-16v20a27.943,27.943,0,0,0,11.952,22.872,23.7,23.7,0,0,0,2.288,29.128,23.263,23.263,0,0,0-4.8,24H144.1V395.567l67.04-59.592H256.1a8,8,0,0,1,8,8v44a12,12,0,1,1-24,0Zm-8-68V239.567c2.656.176,5.3.408,8,.408s5.344-.232,8-.408v80.408Zm56,144h-32a8,8,0,1,1,0-16h32a8,8,0,0,1,0,16Zm-8-112h8a8,8,0,0,1,0,16h-8Zm0,36v-4h8a8,8,0,0,1,0,16H277.29A27.7,27.7,0,0,0,280.1,387.975Zm8,28a8,8,0,0,1,0,16h-32a8,8,0,1,1,0-16Zm-48-192a104,104,0,1,1,104-104A104.12,104.12,0,0,1,240.1,223.975Z" />
                      </g>
                    </g>
                    <g id="Group_6" data-name="Group 6">
                      <g id="Group_5" data-name="Group 5">
                        <path id="Path_3" data-name="Path 3" d="M72.1,311.975a8,8,0,1,1,8-8h16a24,24,0,0,0-16-22.528v-9.472h-16v9.472a23.944,23.944,0,0,0,8,46.528,8,8,0,1,1-8,8h-16a24,24,0,0,0,16,22.528v9.472h16V358.5a23.944,23.944,0,0,0-8-46.528Z" />
                      </g>
                    </g>
                    <g id="Group_8" data-name="Group 8">
                      <g id="Group_7" data-name="Group 7">
                        <path id="Path_4" data-name="Path 4" d="M72.124,247.949A72,72,0,0,0,64.1,391.5v88.472h16V391.5a72,72,0,0,0-7.974-143.554ZM72.1,375.975a56,56,0,1,1,56-56A56,56,0,0,1,72.1,375.975Z" />
                      </g>
                    </g>
                    <g id="Group_10" data-name="Group 10">
                      <g id="Group_9" data-name="Group 9">
                        <path id="Path_5" data-name="Path 5" d="M408.1,311.975a8,8,0,1,1,8-8h16a24,24,0,0,0-16-22.528v-9.472h-16v9.472a23.944,23.944,0,0,0,8,46.528,8,8,0,1,1-8,8h-16a24,24,0,0,0,16,22.528v9.472h16V358.5a23.944,23.944,0,0,0-8-46.528Z" />
                      </g>
                    </g>
                    <g id="Group_12" data-name="Group 12">
                      <g id="Group_11" data-name="Group 11">
                        <path id="Path_6" data-name="Path 6" d="M479.4,311.748A71.784,71.784,0,1,0,400.1,391.5v88.472h16V391.5A72,72,0,0,0,479.4,311.748Zm-71.3,64.227a56,56,0,1,1,56-56A56,56,0,0,1,408.1,375.975Z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <label className=" d-flex flex-column">
                Bid Completed
              <span>
                  6000
              </span>
              </label>
              <span className="metric-view-btn mt-auto">
                View All
              </span>
            </Button>
            <Button color="link" className="metric-btn d-flex flex-column align-items-center">

              <span className="metric-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="480.008" height="480" viewBox="0 0 480.008 480">
                  <g id="money" transform="translate(0 -0.004)">
                    <g id="Group_14" data-name="Group 14">
                      <g id="Group_13" data-name="Group 13">
                        <path id="Path_7" data-name="Path 7" d="M319.64,114.26A12.4,12.4,0,0,0,320,112V64a8,8,0,0,0-16,0V99.98A106.235,106.235,0,0,0,241.44,80h-.7A104.8,104.8,0,0,0,192,91.836V56a8,8,0,0,0-16,0v46.128a108.883,108.883,0,0,0-41.768,86.384C134.608,247.388,182.624,296,241.416,296h.7c59.112,0,106.9-49.76,106.512-108.872A107.87,107.87,0,0,0,319.64,114.26ZM242.008,280h-.592c-50.016,0-90.864-41.328-91.184-91.416C149.9,138.308,190.56,96,240.84,96h.592c50.016,0,90.864,41.328,91.184,91.416C332.944,237.7,292.3,280,242.008,280Z" />
                      </g>
                    </g>
                    <g id="Group_16" data-name="Group 16">
                      <g id="Group_15" data-name="Group 15">
                        <path id="Path_8" data-name="Path 8" d="M184,0a8,8,0,0,0-8,8V24a8,8,0,0,0,16,0V8A8,8,0,0,0,184,0Z" />
                      </g>
                    </g>
                    <g id="Group_18" data-name="Group 18">
                      <g id="Group_17" data-name="Group 17">
                        <path id="Path_9" data-name="Path 9" d="M312,8a7.993,7.993,0,0,0-8,8V32a8,8,0,0,0,16,0V16A7.993,7.993,0,0,0,312,8Z" />
                      </g>
                    </g>
                    <g id="Group_20" data-name="Group 20">
                      <g id="Group_19" data-name="Group 19">
                        <path id="Path_10" data-name="Path 10" d="M96,184a8,8,0,0,0-8,8v64a8,8,0,0,0,16,0V192A8,8,0,0,0,96,184Z" />
                      </g>
                    </g>
                    <g id="Group_22" data-name="Group 22">
                      <g id="Group_21" data-name="Group 21">
                        <path id="Path_11" data-name="Path 11" d="M96,136a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V144A8,8,0,0,0,96,136Z" />
                      </g>
                    </g>
                    <g id="Group_24" data-name="Group 24">
                      <g id="Group_23" data-name="Group 23">
                        <path id="Path_12" data-name="Path 12" d="M400,112a7.993,7.993,0,0,0-8,8v64a8,8,0,0,0,16,0V120A7.993,7.993,0,0,0,400,112Z" />
                      </g>
                    </g>
                    <g id="Group_26" data-name="Group 26">
                      <g id="Group_25" data-name="Group 25">
                        <path id="Path_13" data-name="Path 13" d="M400,64a7.993,7.993,0,0,0-8,8V88a8,8,0,0,0,16,0V72A7.993,7.993,0,0,0,400,64Z" />
                      </g>
                    </g>
                    <g id="Group_28" data-name="Group 28">
                      <g id="Group_27" data-name="Group 27">
                        <path id="Path_14" data-name="Path 14" d="M271.9,207.644l-.056-7.992a23.809,23.809,0,0,0-7.136-16.928,23.536,23.536,0,0,0-17.016-6.872l-16,.152h-.048a8.055,8.055,0,0,1-8-8l-.048-8.016a8.017,8.017,0,0,1,7.952-8.064l7.808-.056c.256.016.48.136.752.136h.048c.272,0,.5-.136.768-.16l22.608-.144a7.849,7.849,0,1,0-.048-15.7h-.048l-15.384-.056-.048-7.92A8.065,8.065,0,0,0,240,120h-.048a8.057,8.057,0,0,0-7.952,8.1l.048,7.9h-.608a23.933,23.933,0,0,0-23.848,24.1l.048,8.024A24.056,24.056,0,0,0,231.648,192h16.2a7.813,7.813,0,0,1,8,7.8l.056,7.968a7.991,7.991,0,0,1-7.952,8.04l-32,.2A8,8,0,0,0,216,232h.048l16-.1.048,8.16a8,8,0,0,0,8,7.944h.048a8,8,0,0,0,7.952-8.056l-.048-8.152A24.03,24.03,0,0,0,271.9,207.644Z" />
                      </g>
                    </g>
                    <g id="Group_30" data-name="Group 30">
                      <g id="Group_29" data-name="Group 29">
                        <circle id="Ellipse_1" data-name="Ellipse 1" cx="8" cy="8" r="8" transform="translate(176 184.004)" />
                      </g>
                    </g>
                    <g id="Group_32" data-name="Group 32">
                      <g id="Group_31" data-name="Group 31">
                        <circle id="Ellipse_2" data-name="Ellipse 2" cx="8" cy="8" r="8" transform="translate(288 184.004)" />
                      </g>
                    </g>
                    <g id="Group_34" data-name="Group 34">
                      <g id="Group_33" data-name="Group 33">
                        <path id="Path_15" data-name="Path 15" d="M472,312H384a23.967,23.967,0,0,0-22.528,16H321.424a7.973,7.973,0,0,0-7.952,7.744L246.728,320.6a24.351,24.351,0,0,0-14.416,1.12l-62.64,24.848a27.824,27.824,0,0,0-16.456,17.592L30.888,328.284a24.21,24.21,0,0,0-21.456,3.84A23.232,23.232,0,0,0,0,350.836v17.352a23.348,23.348,0,0,0,10.776,19.64L99.648,445.34a8.082,8.082,0,0,0,2.568,1.08l132.32,30.216a24.541,24.541,0,0,0,10.928,0L315.1,460.66A7.83,7.83,0,0,0,321.432,464H361.48a23.967,23.967,0,0,0,22.528,16h88a7.993,7.993,0,0,0,8-8V320A8,8,0,0,0,472,312ZM311.5,445.076,241.88,461.044a8.324,8.324,0,0,1-3.768,0L107.16,431.14l-87.7-56.752A7.416,7.416,0,0,1,16,368.18V350.828a7.254,7.254,0,0,1,3.016-5.888,8.216,8.216,0,0,1,7.36-1.3l127.016,37.3A28.385,28.385,0,0,0,180.32,400H240a8,8,0,0,0,0-16H180.32c-6.792,0-12.32-5.256-12.32-11.68a11.736,11.736,0,0,1,7.584-10.848l62.64-24.864a8.4,8.4,0,0,1,4.976-.392l68.768,15.6ZM360,448H328V344h32Zm104,16H384a8,8,0,0,1-8-8V336a8,8,0,0,1,8-8h80Z" />
                      </g>
                    </g>
                    <g id="Group_36" data-name="Group 36">
                      <g id="Group_35" data-name="Group 35">
                        <path id="Path_16" data-name="Path 16" d="M433.432,432h-24a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <label className=" d-flex flex-column">
                Total Earning
              <span>
                  $40,000
              </span>
              </label>
              <span className="metric-view-btn mt-auto">
                View All
              </span>
            </Button>
            <Button color="link" className="metric-btn d-flex flex-column align-items-center">
              <span className="metric-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="323.92" height="364.712" viewBox="0 0 323.92 364.712">
                  <g id="star" transform="translate(-20.397)">
                    <g id="Group_38" data-name="Group 38">
                      <g id="Group_37" data-name="Group 37">
                        <path id="Path_17" data-name="Path 17" d="M312.969,192.261l-83.592-12.016L191.761,104.49a10.449,10.449,0,0,0-18.808,0l-37.616,75.755L51.745,192.261a10.448,10.448,0,0,0-8.359,7.314A10.973,10.973,0,0,0,46,210.024l60.6,59.037L92.5,352.13a10.971,10.971,0,0,0,4.18,10.449,10.45,10.45,0,0,0,10.971,1.045l74.71-39.706,74.71,39.706,4.7,1.045a8.36,8.36,0,0,0,6.269-2.09,10.973,10.973,0,0,0,4.18-10.449l-14.106-83.069,60.6-59.037a10.97,10.97,0,0,0,2.612-10.449A10.449,10.449,0,0,0,312.969,192.261ZM239.3,258.09a10.973,10.973,0,0,0-2.612,8.882l11.494,67.918-61.127-31.869a10.968,10.968,0,0,0-9.4,0L116.528,334.89l11.494-67.918a10.974,10.974,0,0,0-2.612-8.882L75.777,210.025l68.441-9.927a10.973,10.973,0,0,0,7.837-5.747l30.3-61.649,30.3,61.649A10.971,10.971,0,0,0,220.5,200.1l68.441,9.927Z" />
                        <path id="Path_18" data-name="Path 18" d="M182.357,73.143a10.449,10.449,0,0,0,10.449-10.449V10.449a10.449,10.449,0,0,0-20.9,0V62.694A10.449,10.449,0,0,0,182.357,73.143Z" />
                        <path id="Path_19" data-name="Path 19" d="M340.136,55.38a10.449,10.449,0,0,0-14.629,2.09l-31.347,41.8a10.45,10.45,0,0,0,2.09,14.629,9.927,9.927,0,0,0,6.269,2.09,10.969,10.969,0,0,0,8.359-4.18l31.347-41.8A10.448,10.448,0,0,0,340.136,55.38Z" />
                        <path id="Path_20" data-name="Path 20" d="M62.193,115.984a9.925,9.925,0,0,0,6.269-2.09,10.45,10.45,0,0,0,2.09-14.629l-31.346-41.8A10.449,10.449,0,1,0,22.487,70.008l31.347,41.8A10.972,10.972,0,0,0,62.193,115.984Z" />
                      </g>
                    </g>
                  </g>
                </svg>

              </span>
              <label className=" d-flex flex-column">
                Rating
              <span>
                  5500
              </span>
              </label>
              <span className="metric-view-btn mt-auto">
                View All
              </span>
            </Button>
          </div>
        </ModalBody>
      </Modal> */}
      {/* metric-modal end */}
      {/* <Modal isOpen={true} size="lg" className={"d-flex flex-column align-items-center justify-content-center confirm-modal secondary-font-family"}>
        <ModalHeader>
          <span>Confirmation</span>
          <Button color="link" className="close-btn btn2">
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
      </Modal> */}

      {/* <Modal isOpen={true} size="lg" className={"d-flex flex-column align-items-center justify-content-center confirm-modal bidder-completion secondary-font-family"}>
        <ModalHeader className="border-0">
          <Button color="link" className="close-btn btn2">
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

      {/* <Modal isOpen={true} size="lg" className={"d-flex flex-column align-items-center justify-content-center bid-modal secondary-font-family"}>
        <ModalHeader>
          <span>Payment Completed</span>
          <Button color="link" className="close-btn btn2">
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
      </Modal> */}

      {/* <Modal isOpen={true} size="lg" className={"d-flex flex-column align-items-center justify-content-center payment-modal secondary-font-family text-center"}>
        <ModalHeader className="border-0">
          <Button color="link" className="close-btn btn2">
            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
              <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
            </svg>
          </Button>
        </ModalHeader>
        <ModalBody className={"overflow-auto pt-0 d-flex justify-content-center"}>
          <div className="payment-detail-blc">
            <div className="payment-logo">
              <img src={require('../../../assets/images/icons/check-ball.svg')} alt="Check Icon" />
            </div>
            <h2>Payment Completed</h2>
            <p>
              <span className="d-block">1234 5678 1256 7894</span>
              <span>26th Aug 2019 </span>
            </p>
            <h4>
              Paid Amount
            <span className="d-block">$250</span>
            </h4>
            <span className="to-line">to</span>
            <div className="payment-profile d-flex justify-content-center">
              <UserImage />
              <label className="mb-0 d-flex align-items-center">Rapha Conrad</label>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
    </div>
  );
};
export default React.memo(SignInModal);

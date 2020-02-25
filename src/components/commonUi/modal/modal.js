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
import { getTranslations } from "../../../utilities/translations";

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
                  {getTranslations("welcome_to")}
                  <span className="d-block">
                    <Logo classname="signup-logo" navigate={false} />
                  </span>
                </h3>
              </div>

              <div className="signup-modal-frm flex-fill">
                <LocalForm onSubmit={(values) => _handleSubmit(values)}>
                  {_modalType === "/register" && (
                    <React.Fragment>
                      <h2>
                        <label className="d-block">
                          {getTranslations("signUp")}
                        </label>
                      </h2>
                      <InputCell
                        Name={"fname"}
                        Placeholder={getTranslations("first_name")}
                        Model=".fname"
                        InputType={"text"}
                        ClassName="input-icon-cell"
                        InputIcon={true}
                        Errors={{ required: "required" }}
                      />
                      <InputCell
                        Name={"lname"}
                        Placeholder={getTranslations("last_name")}
                        Model=".lname"
                        InputType={"text"}
                        ClassName="input-icon-cell"
                        InputIcon={true}
                        Errors={{ required: "required" }}
                      />
                      <InputCell
                        Name={"email"}
                        Placeholder={getTranslations("email")}
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
                        Placeholder={getTranslations("password")}
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
                          {getTranslations("signUp")}
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
                  {_modalType === "/login" && !isForgot && (
                    <div>
                      <h2>
                        <label className="d-block">
                          {getTranslations("login")}
                        </label>
                      </h2>
                      <InputCell
                        Name={"email"}
                        Placeholder={getTranslations("email")}
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
                        Placeholder={getTranslations("password")}
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
                          {getTranslations("forgot_password")}
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button type="submit" size="lg" className="signup">
                          {getTranslations("login")}
                        </Button>
                      </div>
                      <LoginType {...props} />
                      <p className="signup-link-rw text-center">
                        <span>{getTranslations("dont_account")}</span>
                        <Link className="text-black" to={"/register"}>
                          {getTranslations("sign_up")}
                        </Link>
                      </p>
                    </div>
                  )}
                  {_modalType === "/login" && isForgot && (
                    <div>
                      <h2>
                        <label className="d-block">
                          {getTranslations("forgot")}
                        </label>
                      </h2>
                      {!props._sentForgotEmail && (
                        <InputCell
                          Name={"email"}
                          Placeholder={getTranslations("email")}
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
                            Placeholder={getTranslations("otp")}
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
                            Placeholder={getTranslations("password")}
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
                            Placeholder={getTranslations("confirm_pass")}
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
                          {getTranslations("login")}?
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button type="submit" size="lg" className="signup">
                          {getTranslations("submit")}
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
              <LocalForm onSubmit={(values) => _handleSubmit(values)}>
                <div className="row bid-desc-frm">
                  <div className="col-md-12">
                    <label className="input-title">
                      {getTranslations("description")}
                    </label>
                    <InputCell
                      Name={"description"}
                      Placeholder={getTranslations("description")}
                      Model=".description"
                      InputType={"textarea"}
                      Errors={{ required: "required" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="input-title">
                      {getTranslations("bid_amount")}
                    </label>
                    <InputCell
                      Name={"bid_amount"}
                      Placeholder={getTranslations("bid_amount")}
                      Model=".bid_amount"
                      InputType={"number"}
                      Errors={{ required: "required" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="input-title">
                      {getTranslations("frequency")}
                    </label>
                    <InputCell
                      Name={"frequency"}
                      Model=".frequency"
                      InputType="select"
                      Placeholder={getTranslations("frequency")}
                      Disabled={true}
                      DefaultValue={props._frequency}
                      Errors={{ required: "required" }}
                    />
                  </div>
                </div>
                <div className="bid-frm-btns text-center">
                  {_modalType !== "Place your bid" && (
                    <Button color="link" className="btn-dark">
                      {getTranslations("reject")}
                    </Button>
                  )}
                  {_modalType === "Place your bid" && (
                    <Button color="secondary">
                      {" "}
                      {getTranslations("send")}
                    </Button>
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
                          to={`/bidder-profile/${props._propsDetails.job_provider_id._id}/${props._jobStatus}`}
                        >
                          {`${props._propsDetails.job_provider_id.fname} ${props._propsDetails.job_provider_id.lname}`}
                        </Link>
                        <span>
                          {props._propsDetails.daysfrom}{" "}
                          {getTranslations("day_ago")}
                        </span>
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
                          {getTranslations("reject")}
                        </Button>
                        <Button color="secondary" onClick={props._handleAccept}>
                          {getTranslations("accept")}
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
                        {getTranslations("no_card")}
                        <p className="">
                          <Link
                            className="btn btn-secondary"
                            color="secondary"
                            to={"/profile"}
                          >
                            {getTranslations("add_payment")}
                          </Link>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <React.Fragment>
                      <h2>
                        <strong>{getTranslations("card_holder")}:</strong>
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
                                    <label>
                                      {getTranslations("card_number")}
                                    </label>
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
                                        {getTranslations("expiry_date")}
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
                          {getTranslations("make_payment")}
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
              <LocalForm onSubmit={(values) => _handleSubmit(values)}>
                <div className="contact-us-frm">
                  <InputCell
                    Name={"name"}
                    Placeholder={getTranslations("name")}
                    Model=".name"
                    InputType={"text"}
                    ClassName="input-icon-cell"
                    InputIcon={true}
                    Errors={{ required: "required" }}
                  />
                  <InputCell
                    Name={"email"}
                    Placeholder={getTranslations("email")}
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
                    Placeholder={getTranslations("message")}
                    Model=".message"
                    InputType={"textarea"}
                    InputIcon={true}
                    Errors={{ required: "required" }}
                  />
                </div>
                <div className="contact-us-btm text-left">
                  <Button color="primary">{getTranslations("submit")}</Button>
                </div>
              </LocalForm>
            </div>
          )}

          {_modalType === "Confirmation" && (
            <ModalBody className={"overflow-auto"}>
              <div className="bid-confirm-blc text-center">
                <h2 className="text-primary">
                  {getTranslations("job_accepted_by")}{" "}
                </h2>
                <h3>{_jobProviderName}</h3>
                <div className="bid-confirm-btns d-flex flex-column align-items-center">
                  <Button
                    color="secondary"
                    className="start-job-btn"
                    onClick={() => props.startJob()}
                  >
                    {getTranslations("")}
                  </Button>
                  <Button color="link" onClick={() => _toggleModal()}>
                    {getTranslations("remind_me")}
                  </Button>
                </div>
              </div>
            </ModalBody>
          )}

          {_modalType === "Rate Bidder" && (
            <div className="bid-confirm-blc bidder-completion-blc text-center">
              <div className="bidder-label">{_bidderName}</div>
              <h2 className="text-primary">
                {getTranslations("job_has_completed")}
              </h2>
              <h3>{getTranslations("tap_start")}</h3>
              <div className="bidder-rate d-flex justify-content-center">
                <RatingBlock
                  disablestar={false}
                  ratingClick={(rate) => setBidderrating(rate)}
                />
              </div>
              <div className="rating-desc">
                <LocalForm
                  onSubmit={(values) => _handleSubmit(values, bidderRating)}
                >
                  <div className="rating-desc-rw">
                    <InputCell
                      Name={"reveiw"}
                      Placeholder={getTranslations("review")}
                      Model=".reveiw"
                      InputType={"textarea"}
                      Errors={{ required: "required" }}
                    />
                  </div>
                  <div className="bid-confirm-btns rating-desc-rw text-center">
                    <Button color="secondary" className="start-job-btn">
                      {getTranslations("submit")}
                    </Button>
                  </div>
                </LocalForm>
              </div>
              <div className="bid-confirm-btns d-flex flex-column align-items-center">
                <Button color="link" onClick={() => _toggleModal()}>
                  {getTranslations("remind_me")}
                </Button>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default React.memo(SignInModal);

import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LocalForm } from "react-redux-form";
import { injectStripe, StripeProvider, Elements } from "react-stripe-elements";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "reactstrap";
import DatePicker from "react-datepicker";

import {
  AddCard,
  GetCards,
  removeCard,
  AddBankAccount
} from "../../../actions/user";
import { stripeKey } from "../../../environment";

import StripeCard from "../../../config/stripe";
import InputCell from "../../commonUi/input/inputCell";
import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
import { toastAction } from "../../../actions/toast-actions";
import { getTranslations } from "../../../utilities/translations";
// import "./../postJob/postJob.scss";

const UserPayment = (props) => {
  const [isSelect, setIsSelect] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  const [stripe, setStripe] = useState(window.Stripe(stripeKey));
  const [front_image, setFrontImage] = useState({ url: "", file: {} });
  const [back_image, setBackImage] = useState({ url: "", file: {} });
  const [additional_front, setAdditionalFront] = useState({
    url: "",
    file: {}
  });
  const [additional_back, setAdditionalBack] = useState({ url: "", file: {} });

  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  let usercards = [];
  if (user && user.cards && user.cards.length !== 0) {
    usercards = user.cards;
  }
  useEffect(() => {
    if (user && user.cards && user.cards.length === 0) {
      dispatch(GetCards());
    }
  }, [dispatch, user]);

  const handleBankSubmit = (e) => {
    // Object.keys(e).forEach(item=>{
    //   if(item!="routingNumber"){
    //     return
    //   }
    // })
    setIsLoading(true);

    stripe
      .createToken("bank_account", {
        country: "DE",
        currency: "EUR",
        routing_number: undefined,
        account_number: e.accountNumber,
        account_holder_name: e.firstName,
        account_holder_type: "individual"
      })
      .then((paymentMethod) => {
        if (paymentMethod && paymentMethod.token) {
          let formData = new FormData();
          formData.append("front", front_image.file);
          formData.append("back", back_image.file);
          formData.append("additionalFront", additional_front.file);
          formData.append("additionalBack", additional_back.file);
          formData.append("token", paymentMethod.token.id);
          formData.append("bankId", paymentMethod.token.bank_account.id);
          formData.append("firstName", e.firstName);
          formData.append("lastName", e.lastName);
          formData.append("accountHolderType", "individual");
          formData.append("accountHolderName", e.firstName);
          formData.append("name", e.firstName);
          formData.append("accountNumber", e.accountNumber);
          formData.append("currency", "EUR");
          formData.append("routingNumber", e.routingNumber);
          formData.append("dob", "1997-12-23");
          formData.append("line1", e.line1);
          formData.append("postal", e.postal);
          formData.append("countryCode", "DE");
          formData.append("city", e.city);
          formData.append("state", e.state);
          formData.append("gender", "male");
          formData.append("line2", e.line2);
          formData.append("phone", e.phone);
          formData.append("mcc", "7372");
          formData.append("url", "http://google.com");

          dispatch(
            AddBankAccount(formData, (res) => {
              if (res) {
                setIsLoading(false);
                setIsSelect(!isSelect);
              }
            })
          );
        } else {
          toastAction(false, paymentMethod.error.code);
          setIsLoading(false);
        }
      });
  };

  const handleResult = (val) => {
    if (val && !val.error) {
      setIsLoading(true);
      dispatch(
        AddCard(
          {
            token: val && val.token && val.token.id ? val.token.id : "",
            type: paymentType
          },
          (res) => {
            if (res) {
              dispatch(GetCards());
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          }
        )
      );
    }
  };

  const handleImageOnchange = (type, event) => {
    if (type === "front_image") {
      const imgurl = URL.createObjectURL(event[0]);
      setFrontImage({ url: imgurl, file: event[0] });
    }
    if (type === "back_image") {
      const imgurl = URL.createObjectURL(event[0]);
      setBackImage({ url: imgurl, file: event[0] });
    }
    if (type === "additional_back") {
      const imgurl = URL.createObjectURL(event[0]);
      setAdditionalBack({ url: imgurl, file: event[0] });
    }
    if (type === "additional_front") {
      const imgurl = URL.createObjectURL(event[0]);
      setAdditionalFront({ url: imgurl, file: event[0] });
    }
  };

  const choosePaymentMethod = (type) => {
    setPaymentType(type);
    setIsSelect(!isSelect);
  };

  const _removeImage = (type) => {
    if (type === "front_image") {
      setFrontImage({});
    }
    if (type === "back_image") {
      setBackImage({});
    }
    if (type === "additional_back") {
      setAdditionalBack({});
    }
    if (type === "additional_front") {
      setAdditionalFront({});
    }
  };

  const onDobChange = (e) => {
    setDate(e._d);
  };
  const openBankDetails = (e) => {
    if (paymentType === "credit") {
      setPaymentType("bank");
    } else {
      setPaymentType("credit");
      setFrontImage({});
      setBackImage({});
      setAdditionalBack({});
      setAdditionalFront({});
    }
  };

  const _removeCard = (card_id) => {
    confirmAlert({
      title: "",
      message: getTranslations("delete_card_alert"),
      buttons: [
        {
          label: getTranslations("yes"),
          onClick: () => {
            setIsLoading(true);
            dispatch(
              removeCard(card_id, (callback) => {
                if (callback) {
                  dispatch(GetCards());
                  setIsLoading(false);
                }
              })
            );
          }
        },
        {
          label: getTranslations("no"),
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className="user-profl-col-r">
      {isLoading && <SpinnerOverlay className="position-fixed" />}
      {!isSelect ? (
        <div className="CardDemo payment-cardDemo payment-form">
          <div
            className="user-cards-rw"
            onClick={() => choosePaymentMethod("bank")}
          >
            <div className="user-cards">
              <span className="d-block">
                <img
                  src={require("../../../assets/images/icons/credit-card.svg")}
                  alt="Payment Card"
                />
              </span>
              <label>{getTranslations("bank_details")}</label>
            </div>
          </div>
          <div
            className="user-cards-rw"
            onClick={() => choosePaymentMethod("credit")}
          >
            <div className="user-cards">
              <span className="d-block">
                <img
                  src={require("../../../assets/images/icons/credit-card.svg")}
                  alt="Payment Card"
                />
              </span>
              <label>{getTranslations("credit_card")}</label>
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="payment-card-hd d-flex flex-wrap align-items-center">
            <h2 className="flex-fill mb-0">
              {paymentType === "credit" ? "Card" : "Bank"}{" "}
              {getTranslations("detail")}
            </h2>
            <Button color="link" onClick={() => openBankDetails()}>
              +{" "}
              {paymentType === "credit"
                ? getTranslations("add_bank_details")
                : getTranslations("add_credit_details")}
            </Button>
          </div>
          <div className="user-cards-rw card-detail">
            <div>
              <h2>
                {paymentType === "credit"
                  ? getTranslations("credit_card_details")
                  : getTranslations("type_bank_details")}
              </h2>
              {paymentType === "credit" ? (
                <StripeCard handleResult={handleResult} />
              ) : (
                <div className="CardDemo payment-cardDemo payment-form">
                  <LocalForm
                    onSubmit={(values) => handleBankSubmit(values)}
                  >
                    <ul className="card-detail-item">
                      <li>
                        <InputCell
                          id="LocalForm"
                          Name={"firstName"}
                          Placeholder={getTranslations("first_name")}
                          Model=".firstName"
                          maxlength={16}
                          InputType={"text"}
                          ClassName="input-line-blc"
                          Errors={{ required: "required" }}
                        />

                        <InputCell
                          Name={"lastName"}
                          Placeholder={getTranslations("last_name")}
                          Model=".lastName"
                          InputType={"text"}
                          ClassName="input-line-blc"
                          Errors={{ required: "required" }}
                        />

                        <InputCell
                          Name={"accountNumber"}
                          Placeholder={getTranslations("account_number")}
                          Model=".accountNumber"
                          InputType={"text"}
                          ClassName="input-line-blc"
                          Errors={{
                            required: "required"
                          }}
                        />

                        <InputCell
                          Name={"routingNumber"}
                          Placeholder={getTranslations("routing_number")}
                          Model=".routingNumber"
                          InputType={"text"}
                          ClassName="input-line-blc"
                          Errors={{
                            required: "",
                            invalidNumber: "invalidNumber"
                          }}
                        />
                        <DatePicker
                          selected={date}
                          Placeholder={getTranslations("dob")}
                          maxDate={new Date()}
                          dateFormat="MM/dd/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          onChange={onDobChange}
                          showTimeInput={false}
                        />

                        <InputCell
                          Name={"phone"}
                          Placeholder={getTranslations("mobile")}
                          Model=".phone"
                          InputType={"text"}
                          ClassName="input-line-blc"
                          Errors={{
                            required: "required",
                            invalidNumber: "invalidNumber"
                          }}
                        />
                        <InputCell
                          Name={"address"}
                          Placeholder={getTranslations("address")}
                          Model=".line1"
                          InputType={"text"}
                          ClassName="input-line-blc"
                          Errors={{ required: "required" }}
                        />
                        <InputCell
                          Name={"postal"}
                          Placeholder={getTranslations("zip_code")}
                          Model=".postal"
                          InputType={"text"}
                          ClassName="input-line-blc"
                          Errors={{
                            required: "required",
                            invalidNumber: "invalidNumber"
                          }}
                        />
                        <div className="user-payment-inputs d-flex row">
                          <div className="col-sm-4">
                            <InputCell
                              Name={"country"}
                              Placeholder={getTranslations("country")}
                              Model=".country"
                              InputType={"text"}
                              ClassName="input-line-blc"
                              Errors={{
                                required: "required"
                              }}
                            />
                          </div>
                          <div className="col-sm-4">
                            <InputCell
                              Name={"city"}
                              Placeholder={getTranslations("city")}
                              Model=".city"
                              InputType={"text"}
                              ClassName="input-line-blc"
                              Errors={{ required: "required" }}
                            />
                          </div>
                          <div className="col-sm-4">
                            <InputCell
                              Name={"state"}
                              Placeholder={getTranslations("state")}
                              Model=".state"
                              InputType={"text"}
                              ClassName="input-line-blc"
                              Errors={{ required: "required" }}
                            />
                          </div>
                        </div>
                        <div className="payment-upload-rw">
                          <h4>
                            {getTranslations("national_id")}{" "}
                            <i>({getTranslations("id_message")})</i>
                          </h4>
                          <div className="payment-upload-list d-flex justify-content-center flex-wrap">
                            <div className="payment-pic-btn-cell text-center d-flex flex-column">
                              <div
                                color="link"
                                className={`position-relative payment-pic-btn p-0 d-flex flex-column 
                                    ${
                                      front_image.url ? "image-container" : ""
                                    }`}
                              >
                                {/* payment-upload-pic */}
                                {front_image.url && (
                                  <span className="d-flex flex-column justify-content-center align-items-center payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <div className="position-relative">
                                      <img
                                        src={front_image.url}
                                        alt="User"
                                        className="rounded-circle"
                                      />
                                      <span
                                        color="link"
                                        className="position-absolute rounded-circle payment-upload-pic-btn"
                                        onClick={() =>
                                          _removeImage("front_image")
                                        }
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
                                      </span>
                                    </div>
                                  </span>
                                )}
                                {/* payment-upload-pic */}

                                {/* payment-upload-btn */}
                                {!front_image.url && (
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input
                                      type="file"
                                      className="position-absolute w-100"
                                      onChange={(event) =>
                                        handleImageOnchange(
                                          "front_image",
                                          event.target.files
                                        )
                                      }
                                    />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="91"
                                        height="91"
                                        viewBox="0 0 91 91"
                                      >
                                        <g
                                          id="Group_1"
                                          data-name="Group 1"
                                          transform="translate(-1079.5 -358)"
                                        >
                                          <rect
                                            id="Rectangle_1"
                                            data-name="Rectangle 1"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1170.5 396.5) rotate(90)"
                                          />
                                          <rect
                                            id="Rectangle_2"
                                            data-name="Rectangle 2"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1118 358)"
                                          />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                )}
                              </div>
                              <label>Front</label>
                            </div>
                            <div className="payment-pic-btn-cell text-center d-flex flex-column">
                              <div
                                color="link"
                                className={`position-relative payment-pic-btn p-0 d-flex flex-column ${
                                  back_image.url ? "image-container" : ""
                                }`}
                              >
                                {/* payment-upload-pic */}
                                {back_image.url && (
                                  <span className="d-flex flex-column justify-content-center align-items-center payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <div className="position-relative">
                                      <img
                                        src={back_image.url}
                                        alt="User"
                                        className="rounded-circle"
                                      />
                                      <span
                                        color="link"
                                        className="position-absolute rounded-circle payment-upload-pic-btn"
                                        onClick={() =>
                                          _removeImage("back_image")
                                        }
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
                                      </span>
                                    </div>
                                  </span>
                                )}
                                {/* payment-upload-pic */}

                                {/* payment-upload-btn */}
                                {!back_image.url && (
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input
                                      type="file"
                                      className="position-absolute w-100"
                                      onChange={(event) =>
                                        handleImageOnchange(
                                          "back_image",
                                          event.target.files
                                        )
                                      }
                                    />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="91"
                                        height="91"
                                        viewBox="0 0 91 91"
                                      >
                                        <g
                                          id="Group_1"
                                          data-name="Group 1"
                                          transform="translate(-1079.5 -358)"
                                        >
                                          <rect
                                            id="Rectangle_1"
                                            data-name="Rectangle 1"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1170.5 396.5) rotate(90)"
                                          />
                                          <rect
                                            id="Rectangle_2"
                                            data-name="Rectangle 2"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1118 358)"
                                          />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                )}
                              </div>
                              <label>{getTranslations("back")}</label>
                            </div>
                            <div className="payment-pic-btn-cell text-center d-flex flex-column">
                              <div
                                color="link"
                                className={`position-relative payment-pic-btn p-0 d-flex flex-column 
                                    ${
                                      additional_front.url
                                        ? "image-container"
                                        : ""
                                    }`}
                              >
                                {/* payment-upload-pic */}
                                {additional_front.url && (
                                  <span className="d-flex flex-column justify-content-center align-items-center payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <div className="position-relative">
                                      <img
                                        src={additional_front.url}
                                        alt="User"
                                        className="rounded-circle"
                                      />
                                      <span
                                        color="link"
                                        className="position-absolute rounded-circle payment-upload-pic-btn"
                                        onClick={() =>
                                          _removeImage("additional_front")
                                        }
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
                                      </span>
                                    </div>
                                  </span>
                                )}
                                {/* payment-upload-pic */}

                                {/* payment-upload-btn */}
                                {!additional_front.url && (
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input
                                      type="file"
                                      className="position-absolute w-100"
                                      onChange={(event) =>
                                        handleImageOnchange(
                                          "additional_front",
                                          event.target.files
                                        )
                                      }
                                    />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="91"
                                        height="91"
                                        viewBox="0 0 91 91"
                                      >
                                        <g
                                          id="Group_1"
                                          data-name="Group 1"
                                          transform="translate(-1079.5 -358)"
                                        >
                                          <rect
                                            id="Rectangle_1"
                                            data-name="Rectangle 1"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1170.5 396.5) rotate(90)"
                                          />
                                          <rect
                                            id="Rectangle_2"
                                            data-name="Rectangle 2"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1118 358)"
                                          />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                )}
                              </div>
                              <label>
                                {getTranslations("additional_font")}
                              </label>
                            </div>
                            <div className="payment-pic-btn-cell text-center d-flex flex-column">
                              <div
                                color="link"
                                className={`position-relative payment-pic-btn p-0 d-flex flex-column ${
                                  additional_back.url ? "image-container" : ""
                                }`}
                              >
                                {/* payment-upload-pic */}
                                {additional_back.url && (
                                  <span className="d-flex flex-column justify-content-center align-items-center payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <div className="position-relative">
                                      <img
                                        src={additional_back.url}
                                        alt="User"
                                        className="rounded-circle"
                                      />
                                      <span
                                        color="link"
                                        className="position-absolute rounded-circle payment-upload-pic-btn"
                                        onClick={() =>
                                          _removeImage("additional_back")
                                        }
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
                                      </span>
                                    </div>
                                  </span>
                                )}
                                {/* payment-upload-pic */}

                                {/* payment-upload-btn */}
                                {!additional_back.url && (
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input
                                      type="file"
                                      className="position-absolute w-100"
                                      onChange={(event) =>
                                        handleImageOnchange(
                                          "additional_back",
                                          event.target.files
                                        )
                                      }
                                    />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="91"
                                        height="91"
                                        viewBox="0 0 91 91"
                                      >
                                        <g
                                          id="Group_1"
                                          data-name="Group 1"
                                          transform="translate(-1079.5 -358)"
                                        >
                                          <rect
                                            id="Rectangle_1"
                                            data-name="Rectangle 1"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1170.5 396.5) rotate(90)"
                                          />
                                          <rect
                                            id="Rectangle_2"
                                            data-name="Rectangle 2"
                                            width="14"
                                            height="91"
                                            rx="7"
                                            transform="translate(1118 358)"
                                          />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                )}
                              </div>
                              <label>
                                {getTranslations("additional_back")}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="payment-btn-row text-center">
                      <Button color="secondary" type="submit">
                        {getTranslations("submit")}
                      </Button>
                      <Button color="link" className="btn-dark">
                        {getTranslations("reset")}
                      </Button>
                    </div>
                  </LocalForm>
                </div>
              )}
            </div>
          </div>

          {paymentType === "credit" &&
            usercards &&
            usercards.length !== 0 &&
            usercards.map((val, count) => {
              return (
                <div className="user-cards-rw" key={count}>
                  <div className="card-chip position-relative">
                    <Button
                      color="link"
                      className="d-flex align-items-center justify-content-center card-del-btn position-absolute p-0"
                    >
                      <span
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        onClick={() => _removeCard(val.id)}
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
                      </span>
                    </Button>
                    <div className="card-chip-hd d-flex justify-content-end">
                      <div className="card-confirm-pic2">
                        {val.type == "visa" ? (
                          <img
                            src={require("../../../assets/images/icons/payment-icon/visa.svg")}
                            alt="Visa Card"
                          />
                        ) : val.type == "amex" ? (
                          <img
                            src={require("../../../assets/images/icons/payment-icon/amex.svg")}
                            alt="Visa Card"
                          />
                        ) : val.type == "mastercard" ? (
                          <img
                            src={require("../../../assets/images/icons/payment-icon/master-card.svg")}
                            alt="Visa Card"
                          />
                        ) : val.type == "discover" ? (
                          <img
                            src={require("../../../assets/images/icons/payment-icon/discover.svg")}
                            alt="Visa Card"
                          />
                        ) : val.type == "jcb" ? (
                          <img
                            src={require("../../../assets/images/icons/payment-icon/jcb.svg")}
                            alt="Visa Card"
                          />
                        ) : (
                          <img
                            src={require("../../../assets/images/icons/payment-icon/master-card.svg")}
                            alt="Visa Card"
                          />
                        )}
                      </div>
                    </div>
                    <div className="card-chip-no">
                      <span>XXXX</span>
                      <span>XXXX</span>
                      <span>
                        XXX<span className="grey-digit">X</span>
                      </span>
                      <span className="last-digit grey-digit">{val.last4}</span>
                    </div>
                    <div className="card-chip-btm d-flex">
                      <div className="card-chip-col flex-fill">
                        <h2>{val.acHolderName ? val.acHolderName : "----"}</h2>
                        <h3>-----</h3>
                      </div>
                      <div className="card-chip-col rt">
                        <h2>{getTranslations("valid_thru")}</h2>
                        <h3 className="mb-0">{val.cardValidity}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </React.Fragment>
      )}
    </div>
  );
};
const CardForm = injectStripe(UserPayment);

export default class CardDemo extends Component {
  render() {
    return (
      <>
        <StripeProvider apiKey={stripeKey}>
          <Elements>
            <CardForm handleResult={this.props.handleResult} />
          </Elements>
        </StripeProvider>
      </>
    );
  }
}

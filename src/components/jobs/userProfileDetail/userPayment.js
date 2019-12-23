import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LocalForm } from "react-redux-form";
import { injectStripe, StripeProvider, Elements } from "react-stripe-elements";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "reactstrap";
import DatePicker from "react-datepicker";

import { AddCard, GetCards, removeCard } from "../../../actions/user";
import { stripeKey } from "../../../environment";

import StripeCard from "../../../config/stripe";
import InputCell from "../../commonUi/input/inputCell";
import SpinnerOverlay from "../../../components/commonUi/spinner/spinnerOverlay/spinnerOverlay";
// import "./../postJob/postJob.scss";

const UserPayment = props => {
  const [isSelect, setIsSelect] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState({});

  const dispatch = useDispatch();
  let user = useSelector(state => state.user);

  let usercards = [];
  if (user && user.cards && user.cards.length !== 0) {
    usercards = user.cards;
  }
  useEffect(() => {
    if (user && user.cards && user.cards.length === 0) {
      dispatch(GetCards());
    }
  });

  const handleBankSubmit = e => {
    props.stripe.createSource(
      {
        // country: "DK",
        // currency: "USD",
        // routing_number: e.routing_number,
        // account_number: e.account_number,
        // account_holder_name: e.first_name,
        // account_holder_type

        type: "ideal",
        amount: 1099,
        currency: "eur",
        owner: {
          name: e.first_name
        },
        redirect: {
          return_url: "https://example.com"
        }
      },
      (status, response) => {
        console.log("status, response", status, response);
        if (response.error) {
          alert(
            "Adding bank account failed with error: " + response.error.message
          );
        } else {
          console.log("response", response);
          const bankAccountToken = response.id;
          console.log(bankAccountToken);
          // send bankAccountToken to server to be saved under the current user
          // show success message and navigate away from form
        }
      }
    );
  };

  const handleResult = val => {
    if (val && !val.error) {
      setIsLoading(true);
      dispatch(
        AddCard(
          {
            token: val && val.token && val.token.id ? val.token.id : "",
            type: paymentType
          },
          res => {
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

  let files = {};
  const handleImageOnchange = event => {
    files = event;
    setImageData({ ...imageData, ...files });
    const imagesData = Object.values(files).reduce((list, key) => {
      if (key && typeof key === "object") {
        let url = URL.createObjectURL(key);
        list.push(url);
      }
      return list;
    }, []);
    setImages([...images, ...imagesData]);
  };

  const choosePaymentMethod = type => {
    setPaymentType(type);
    setIsSelect(!isSelect);
  };

  const onDobChange = e => {
    setDate(e._d);
  };

  const _removeCard = card_id => {
    confirmAlert({
      title: "",
      message: "Are you sure do you want to delete this card ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setIsLoading(true);
            dispatch(
              removeCard(card_id, callback => {
                if (callback) {
                  dispatch(GetCards());
                  setIsLoading(false);
                }
              })
            );
          }
        },
        {
          label: "No",
          onClick: () => { }
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
              <label>Bank Details</label>
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
              <label>Credit Card</label>
            </div>
          </div>
        </div>
      ) : (
          <React.Fragment>
            <div className="payment-card-hd d-flex flex-wrap align-items-center">
              <h2 className="flex-fill mb-0">
                {paymentType === "credit" ? "Card" : "Bank"} Detail
            </h2>
              <Button
                color="link"
                onClick={() =>
                  paymentType === "credit"
                    ? setPaymentType("bank")
                    : setPaymentType("credit")
                }
              >
                + Add {paymentType === "credit" ? "Bank" : "Card"}
              </Button>
            </div>
            <div className="user-cards-rw card-detail">
              <h2>
                Type your {paymentType === "credit" ? "Card" : "Bank"} details
            </h2>
              {paymentType === "credit" ? (
                <StripeCard handleResult={handleResult} />
              ) : (
                  <div className="CardDemo payment-cardDemo payment-form">
                    <LocalForm onSubmit={values => handleBankSubmit(values)}>
                      <ul className="card-detail-item">
                        <li>
                          <InputCell
                            Name={"firstName"}
                            Placeholder={"First Name"}
                            Model=".firstName"
                            maxlength={16}
                            InputType={"text"}
                            ClassName="input-line-blc"
                            Errors={{ required: "required" }}
                          />

                          <InputCell
                            Name={"lastName"}
                            Placeholder={"Last Name"}
                            Model=".lastName"
                            InputType={"text"}
                            ClassName="input-line-blc"
                            Errors={{ required: "required" }}
                          />

                          <InputCell
                            Name={"accountNumber"}
                            Placeholder={"Account Number"}
                            Model=".accountNumber"
                            InputType={"text"}
                            ClassName="input-line-blc"
                            Errors={{
                              required: "required"
                            }}
                          />

                          <InputCell
                            Name={"routingNumber"}
                            Placeholder={"Routing Number"}
                            Model=".routingNumber"
                            InputType={"text"}
                            ClassName="input-line-blc"
                            Errors={{
                              required: "required",
                              invalidNumber: "invalidNumber"
                            }}
                          />
                          <DatePicker
                            selected={date}
                            //      value={new Date()}
                            // onChange={date => setEndDate(date)}
                            Placeholder={"Date of Birth"}
                            maxDate={new Date()}
                            // maxDate={startDate}
                            dateFormat="MM/dd/yyyy"
                            // onInputClick={() => handleOnInputClick()}
                            // onClickOutsideEvent={handleOnClickOutsideEvent()}
                            showMonthDropdown
                            showYearDropdown
                            onChange={onDobChange}
                            showTimeInput={false}
                          />
                          {/* <InputCell
                        Name={"dob"}
                        Placeholder={"Date of Birth"}
                        Model=".dob"
                        InputType={"date"}
                        ClassName="input-line-blc"
                        Errors={{ required: "required" }}
                      /> */}
                          <InputCell
                            Name={"phone"}
                            Placeholder={"Mobile"}
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
                            Placeholder={"Address"}
                            Model=".line1"
                            InputType={"text"}
                            ClassName="input-line-blc"
                            Errors={{ required: "required" }}
                          />
                          <InputCell
                            Name={"postal"}
                            Placeholder={"Zip code"}
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
                                Placeholder={"Country"}
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
                                Placeholder={"City"}
                                Model=".city"
                                InputType={"text"}
                                ClassName="input-line-blc"
                                Errors={{ required: "required" }}
                              />
                            </div>
                            <div className="col-sm-4">
                              <InputCell
                                Name={"state"}
                                Placeholder={"State"}
                                Model=".state"
                                InputType={"text"}
                                ClassName="input-line-blc"
                                Errors={{ required: "required" }}
                              />
                            </div>
                          </div>
                          <div class="payment-upload-rw">
                            <h4>National id <i>(clear image of front, back, additional if front and back)</i></h4>
                            <div className="payment-upload-list d-flex justify-content-center flex-wrap">
                              <div className="payment-pic-btn-cell text-center d-flex flex-column">
                                <Button color="link" className="position-relative payment-pic-btn p-0 d-flex flex-column">
                                  {/* payment-upload-pic */}
                                  <span className="payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <img src={require('../../../assets/images/job-user.jpg')} alt="User" className="rounded-circle" />
                                    <span color="link" className="position-absolute rounded-circle payment-upload-pic-btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
                                        <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
                                      </svg>
                                    </span>
                                  </span>
                                  {/* payment-upload-pic */}

                                  {/* payment-upload-btn */}
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input type="file" className="position-absolute w-100" />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91">
                                        <g id="Group_1" data-name="Group 1" transform="translate(-1079.5 -358)">
                                          <rect id="Rectangle_1" data-name="Rectangle 1" width="14" height="91" rx="7" transform="translate(1170.5 396.5) rotate(90)" />
                                          <rect id="Rectangle_2" data-name="Rectangle 2" width="14" height="91" rx="7" transform="translate(1118 358)" />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                </Button>
                                <label>
                                  Front
                                </label>
                              </div>
                              <div className="payment-pic-btn-cell text-center d-flex flex-column">
                                <Button color="link" className="position-relative payment-pic-btn p-0 d-flex flex-column">
                                  {/* payment-upload-pic */}
                                  <span className="payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <img src={require('../../../assets/images/job-user.jpg')} alt="User" className="rounded-circle" />
                                    <span color="link" className="position-absolute rounded-circle payment-upload-pic-btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
                                        <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
                                      </svg>
                                    </span>
                                  </span>
                                  {/* payment-upload-pic */}

                                  {/* payment-upload-btn */}
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input type="file" className="position-absolute w-100" />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91">
                                        <g id="Group_1" data-name="Group 1" transform="translate(-1079.5 -358)">
                                          <rect id="Rectangle_1" data-name="Rectangle 1" width="14" height="91" rx="7" transform="translate(1170.5 396.5) rotate(90)" />
                                          <rect id="Rectangle_2" data-name="Rectangle 2" width="14" height="91" rx="7" transform="translate(1118 358)" />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                </Button>
                                <label>
                                  Back
                                </label>
                              </div>
                              <div className="payment-pic-btn-cell text-center d-flex flex-column">
                                <Button color="link" className="position-relative payment-pic-btn p-0 d-flex flex-column">
                                  {/* payment-upload-pic */}
                                  <span className="payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <img src={require('../../../assets/images/job-user.jpg')} alt="User" className="rounded-circle" />
                                    <span color="link" className="position-absolute rounded-circle payment-upload-pic-btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
                                        <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
                                      </svg>
                                    </span>
                                  </span>
                                  {/* payment-upload-pic */}

                                  {/* payment-upload-btn */}
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input type="file" className="position-absolute w-100" />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91">
                                        <g id="Group_1" data-name="Group 1" transform="translate(-1079.5 -358)">
                                          <rect id="Rectangle_1" data-name="Rectangle 1" width="14" height="91" rx="7" transform="translate(1170.5 396.5) rotate(90)" />
                                          <rect id="Rectangle_2" data-name="Rectangle 2" width="14" height="91" rx="7" transform="translate(1118 358)" />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                </Button>
                                <label>
                                  Additional Front
                                </label>
                              </div>
                              <div className="payment-pic-btn-cell text-center d-flex flex-column">
                                <Button color="link" className="position-relative payment-pic-btn p-0 d-flex flex-column">
                                  {/* payment-upload-pic */}
                                  <span className="payment-upload-pic position-absolute h-100 w-100 flex-fill">
                                    <img src={require('../../../assets/images/job-user.jpg')} alt="User" className="rounded-circle" />
                                    <span color="link" className="position-absolute rounded-circle payment-upload-pic-btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
                                        <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
                                      </svg>
                                    </span>
                                  </span>
                                  {/* payment-upload-pic */}

                                  {/* payment-upload-btn */}
                                  <span className="payment-upload-btn d-flex align-items-center justify-content-center flex-fill position-absolute h-100 w-100">
                                    <input type="file" className="position-absolute w-100" />
                                    <span className="payment-upload-btn-icn w-100 h-100 d-flex align-items-center justify-content-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91">
                                        <g id="Group_1" data-name="Group 1" transform="translate(-1079.5 -358)">
                                          <rect id="Rectangle_1" data-name="Rectangle 1" width="14" height="91" rx="7" transform="translate(1170.5 396.5) rotate(90)" />
                                          <rect id="Rectangle_2" data-name="Rectangle 2" width="14" height="91" rx="7" transform="translate(1118 358)" />
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                </Button>
                                <label>
                                  Additional Back
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* <Button
                            color="primary"
                            block
                            className="add-gallery-btn position-relative"
                            type="button"
                          > */}
                          {/* <svg
                                id="_x38__3_"
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                              >
                                <g id="Group_512" data-name="Group 512">
                                  <path
                                    id="Path_902"
                                    data-name="Path 902"
                                    d="M24,0A24,24,0,1,0,48,24,24,24,0,0,0,24,0Zm0,45A21,21,0,1,1,45,24,21,21,0,0,1,24,45Zm9-22.5H25.5V15a1.5,1.5,0,1,0-3,0v7.5H15a1.5,1.5,0,1,0,0,3h7.5V33a1.5,1.5,0,0,0,3,0V25.5H33a1.5,1.5,0,0,0,0-3Z"
                                    fill="#fff"
                                  />
                                </g>
                              </svg> */}
                          {/* <InputCell
                            Name={"file"}
                            Model=".images"
                            InputType="file"
                            Placeholder={"Image Upload"}
                            Multiple="multiple"
                            Errors={{ required: "" }}
                            HandleImageOnchange={handleImageOnchange}
                            Errors={{ required: "required" }}
                          /> */}
                          {/* </Button> */}
                        </li>
                      </ul>
                      <div className="payment-btn-row text-center">
                        <Button color="secondary" type="submit">
                          Submit
                        </Button>
                        <Button color="primary">
                          Reset
                        </Button>
                      </div>
                    </LocalForm>
                  </div>
                )}
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
                      <div className="card-chip-hd text-right">
                        <div className="card-confirm-pic d-flex justify-content-center align-items-center">
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
                          <h2>VALID THRU</h2>
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

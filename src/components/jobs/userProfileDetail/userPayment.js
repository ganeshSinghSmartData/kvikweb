import React, { Component, useState, useEffect } from "react";
import StripeCard from '../../../config/stripe';
import { AddCard, GetCards } from '../../../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { stripeKey } from '../../../environment';
import { Button, Label } from "reactstrap";
import { LocalForm, actions } from "react-redux-form";
import InputCell from "../../commonUi/input/inputCell";
import {
    CardElement,
    injectStripe,
    StripeProvider,
    Elements,
    BankForm
} from 'react-stripe-elements';
const UserPayment = (props) => {
    console.log(props);
    const [cards, setCards] = useState(0);
    const [isCard, setIsCard] = useState(true);
    const [cardtype, setCardType] = useState('credit');
    const dispatch = useDispatch();
    let user = useSelector(state => state.user);
    // Stripe.setPublishableKey('THE-PUBLIC-KEY');

    console.log("user :", user.cards);
    useEffect(() => {
        if (cards === 0) {
            dispatch(GetCards());
            setCards(1);
        }
    });

    const handleBankSubmit = (e) => {
        const account_holder_type = 'personal';

        props.stripe.createSource({
            country: 'US',
            currency: 'USD',
            routing_number: e.routing_number,
            account_number: e.account_number,
            account_holder_name: e.first_name,
            account_holder_type
        }, (status, response) => {
            if (response.error) {
                alert('Adding bank account failed with error: ' + response.error.message);
            } else {
                const bankAccountToken = response.id;
                console.log(bankAccountToken);
                // send bankAccountToken to server to be saved under the current user
                // show success message and navigate away from form
            }
        });
    }

    const handleResult = (val) => {

        dispatch(AddCard({ token: val && val.token && val.token.id ? val.token.id : "", type: cardtype }, res => {
            if (res) {
                dispatch(GetCards());
            }
        }));
    }

    const setCard = (type) => {
        setCardType(type);
        setIsCard(false);
    }

    return (
        <div className="user-profl-col-r">
            {!isCard ?
                <React.Fragment>
                    <div className="payment-card-hd d-flex flex-wrap align-items-center">
                        <h2 className="flex-fill mb-0">Card Detail</h2>
                        <Button color="link">
                            + Add Bank
                        </Button>
                    </div>
                    <div className="user-cards-rw card-detail">
                        <h2>Type your card details</h2>
                        {/* <ul className="card-detail-item">
            <li>
                <Label>Card Number</Label>
                <InputCell
                    Name={"number"}
                    Placeholder={"Card Number"}
                    Model=".number"
                    maxlength={16}
                    InputType={"text"}
                    ClassName="input-line-blc"
                    Errors={{ required: "required" }}
                />
            </li>
            <li>
                <Label>CVC</Label>
                <InputCell
                    Name={"cvc"}
                    Placeholder={"Card CVC"}
                    Model=".cvc"
                    InputType={"text"}
                    ClassName="input-line-blc"
                    Errors={{ required: "required" }}
                />
            </li>
            <li>
                <Label>Expiry Date</Label>
                <InputCell
                    Name={"Expiry Month"}
                    Placeholder={"Expiry month"}
                    Model=".exp_month"
                    InputType={"text"}
                    ClassName="input-line-blc"
                    Errors={{ required: "required" }}
                />
                <InputCell
                    Name={"Expiry Year"}
                    Placeholder={"Expiry year"}
                    Model=".exp_year"
                    InputType={"text"}
                    ClassName="input-line-blc"
                    Errors={{ required: "required" }}
                />
            </li>
        </ul> */}
                        {cardtype === "credit" ?
                            <StripeCard handleResult={handleResult} />
                            :
                            <LocalForm
                                onSubmit={values => handleBankSubmit(values)}
                            >
                                <ul className="card-detail-item">
                                    <li>
                                        <Label>Personal Details</Label>
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
                                            Name={"Last Name"}
                                            Placeholder={"Last Name"}
                                            Model=".last_name"
                                            InputType={"text"}
                                            ClassName="input-line-blc"
                                            Errors={{ required: "required" }}
                                        />
                                    </li>
                                    <li>
                                        <Label>Account Details</Label>
                                        <InputCell
                                            Name={"Account Number"}
                                            Placeholder={"Account Number"}
                                            Model=".account_no"
                                            InputType={"text"}
                                            ClassName="input-line-blc"
                                            Errors={{ required: "required" }}
                                        />
                                        <InputCell
                                            Name={"Routing Number"}
                                            Placeholder={"Routing Number"}
                                            Model=".routing_no"
                                            InputType={"text"}
                                            ClassName="input-line-blc"
                                            Errors={{ required: "required" }}
                                        />
                                    </li>
                                </ul>
                                <Button color="secondary" type="submit">
                                    Submit
                            </Button>
                            </LocalForm>
                        }
                    </div>
                    {user && user.cards && user.cards.length > 0 && user.cards.map((val, count) => {
                        return (
                            <div className="user-cards-rw" key={count}>
                                <div className="card-chip position-relative">
                                    <Button color="link" className="d-flex align-items-center justify-content-center card-del-btn position-absolute p-0">
                                        <span className="rounded-circle d-flex align-items-center justify-content-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="357" viewBox="0 0 357 357">
                                                <path id="Forma_1" data-name="Forma 1" d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z" />
                                            </svg>
                                        </span>
                                    </Button>
                                    <div className="card-chip-hd text-right">
                                        <div className="card-confirm-pic d-flex justify-content-center align-items-center">
                                            {val.type == "visa"
                                                ? <img
                                                    src={require("../../../assets/images/icons/payment-icon/visa.svg")}
                                                    alt="Visa Card"
                                                /> : val.type == "amex" ? <img
                                                    src={require("../../../assets/images/icons/payment-icon/amex.svg")}
                                                    alt="Visa Card"
                                                /> : val.type == "mastercard" ? <img
                                                    src={require("../../../assets/images/icons/payment-icon/master-card.svg")}
                                                    alt="Visa Card"
                                                /> : val.type == "discover" ? <img
                                                    src={require("../../../assets/images/icons/payment-icon/discover.svg")}
                                                    alt="Visa Card"
                                                /> : val.type == "jcb" ? <img
                                                    src={require("../../../assets/images/icons/payment-icon/jcb.svg")}
                                                    alt="Visa Card"
                                                /> : <img
                                                                    src={require("../../../assets/images/icons/payment-icon/master-card.svg")}
                                                                    alt="Visa Card"
                                                                />}
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
                                            <h2>{val.acHolderName ? val.acHolderName : '----'}</h2>
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

                :
                <React.Fragment>
                    <div className="user-cards-rw" onClick={() => setCard('debit')}>
                        <div className="user-cards">
                            <span className="d-block">
                                <img src={require('../../../assets/images/icons/credit-card.svg')} alt="Payment Card" />
                            </span>
                            <label>Bank Details</label>
                        </div>
                    </div>
                    <div className="user-cards-rw" onClick={() => setCard('credit')}>
                        <div className="user-cards">
                            <span className="d-block">
                                <img src={require('../../../assets/images/icons/credit-card.svg')} alt="Payment Card" />
                            </span>
                            <label>Credit Card</label>
                        </div>
                    </div>
                </React.Fragment>
            }

        </div>


    );
};
const CardForm = injectStripe(UserPayment);

export default class CardDemo extends Component {
    render() {
        return (
            <div>
                <StripeProvider apiKey="pk_test_DwzVvw7dIyntcsbXh6OsNVS200eXzmTfcz">
                    <Elements>
                        <CardForm handleResult={this.props.handleResult} />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

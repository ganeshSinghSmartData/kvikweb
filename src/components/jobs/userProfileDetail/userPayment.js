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
    const user = useSelector(state => state.user);
    // Stripe.setPublishableKey('THE-PUBLIC-KEY');
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
    const showCards = (e) => {
        e.preventDefault();
        alert(5)
    }
    return (
        <div className="user-profl-col-r">
            {!isCard ?
                <React.Fragment>

                    <h2 style={{
                        float: "left"
                    }}>Add Card</h2>
                    <h2 style={{
                        float: "right",
                        cursor: "Pointer"

                    }} onClick={e => showCards(e)}>View Card</h2>

                    {user && user.cards && user.cards.length > 0 && user.cards.map((val, count) => {
                        return (
                            <div className="user-cards-rw">
                                <div className="card-chip">
                                    <div className="card-chip-hd text-right">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="44.679"
                                            height="25"
                                            viewBox="0 0 44.679 25"
                                        >
                                            <g
                                                id="Group_8125"
                                                data-name="Group 8125"
                                                transform="translate(-1139.321 -235)"
                                            >
                                                <g
                                                    id="Group_8055"
                                                    data-name="Group 8055"
                                                    transform="translate(1139.321 235.032)"
                                                >
                                                    <path
                                                        id="Path_3530"
                                                        data-name="Path 3530"
                                                        d="M305.717,156.524a12.314,12.314,0,1,1,0-16.421"
                                                        transform="translate(-284.224 -136)"
                                                        fill="#eb001b"
                                                    />
                                                </g>
                                                <g
                                                    id="Group_8056"
                                                    data-name="Group 8056"
                                                    transform="translate(1159 235)"
                                                >
                                                    <circle
                                                        id="Ellipse_369"
                                                        data-name="Ellipse 369"
                                                        cx="12.5"
                                                        cy="12.5"
                                                        r="12.5"
                                                        fill="#ffd100"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
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

                    <div className="user-cards-rw card-detail">
                        <h2 style={{
                            float: "left"
                        }}>Type your card details</h2>
                        {/* <ul className="card-detail-item">
            <li>
                <Label>Card Number</Label>
                <InputCell
                    Name={"number"}
                    Placeholder={"Card Number"}
                    Model=".number"
                    maxlength={16}
                    InputType={"text"}
                    className="input-line-blc"
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
                    className="input-line-blc"
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
                    className="input-line-blc"
                    Errors={{ required: "required" }}
                />
                <InputCell
                    Name={"Expiry Year"}
                    Placeholder={"Expiry year"}
                    Model=".exp_year"
                    InputType={"text"}
                    className="input-line-blc"
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
                                            className="input-line-blc"
                                            Errors={{ required: "required" }}
                                        />

                                        <InputCell
                                            Name={"Last Name"}
                                            Placeholder={"Last Name"}
                                            Model=".last_name"
                                            InputType={"text"}
                                            className="input-line-blc"
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
                                            className="input-line-blc"
                                            Errors={{ required: "required" }}
                                        />
                                        <InputCell
                                            Name={"Routing Number"}
                                            Placeholder={"Routing Number"}
                                            Model=".routing_no"
                                            InputType={"text"}
                                            className="input-line-blc"
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
            <StripeProvider apiKey="pk_test_DwzVvw7dIyntcsbXh6OsNVS200eXzmTfcz">
                <Elements>
                    <CardForm handleResult={this.props.handleResult} />
                </Elements>
            </StripeProvider>

        );
    }
}

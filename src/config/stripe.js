import React, { Component } from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import { Button, Label } from "reactstrap";
import UserPayment from '../components/jobs/userProfileDetail/userPayment';
import { LocalForm } from "react-redux-form";

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  };
};

class _CardForm extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      const token = this.props.stripe.createToken().then(this.props.handleResult);
      console.log(token);
      // this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="CardDemo payment-cardDemo">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <CardElement
              onChange={this.handleChange}
              {...createOptions()}
            />
            {/* <UserPayment></UserPayment> */}
          </label>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>

          <div className="card-detail-btn text-center">
            <Button color="secondary">Make Payment</Button>
          </div>
        </form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

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
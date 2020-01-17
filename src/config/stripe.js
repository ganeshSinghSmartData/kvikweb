import React, { Component } from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
  BankForm
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
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: false
    }
  }

  handleChange = ({ error }) => {
    let errorMessage = false;
    if (error) {
      errorMessage = error.message;
    }
    this.setState({ errorMessage: errorMessage });
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
  // handlebankSubmit = (evt) => {
  //   evt.preventDefault();
  //   if (this.props.stripe) {
  //     const account_holder_type = 'personal';

  //     Stripe.bankAccount.createToken({
  //       country: 'US',
  //       currency: 'USD',
  //       routing_number: e.routing_number,
  //       account_number: e.account_number,
  //       account_holder_name: e.first_name,
  //       account_holder_type
  //     }, (status, response) => {
  //       if (response.error) {
  //         alert('Adding bank account failed with error: ' + response.error.message);
  //       } else {
  //         const bankAccountToken = response.id;
  //         console.log(bankAccountToken);
  //         // send bankAccountToken to server to be saved under the current user
  //         // show success message and navigate away from form
  //       }
  //     });
  //     // this.props.stripe.createToken().then(this.props.handleResult);
  //   } else {
  //     console.log("Stripe.js hasn't loaded yet.");
  //   }
  // };

  render() {
    return (
      <div className="CardDemo payment-cardDemo payment-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <CardElement
              onChange={this.handleChange}
              {...createOptions() }
            />
            {/* <UserPayment></UserPayment> */}
          </label>
          {
            this.state.errorMessage ? <div className="error" role="alert">
              {this.state.errorMessage}
            </div> : null
          }

          <div className="card-detail-btn text-center">
            <Button color="secondary">Save</Button>
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
      <StripeProvider apiKey="pk_test_d1UROWtZYJBNTCKAPLSjjY1x00Vbn25a9Q">
        <Elements>
          <CardForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>

    );
  }
}
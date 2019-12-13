import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

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

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      const token=this.props.stripe.createToken().then(this.props.handleResult);
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
            <h2>Card details</h2>
            <CardElement
              onChange={this.handleChange}
              {...createOptions()}
            />
          </label>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
        <div className="payment-com-btn">
        <button>Add Card</button>
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
      <StripeProvider apiKey="pk_test_SRoR6VJO3S4M6XzIxkwi8vko00Rp3jGmeA">
        <Elements>
          <CardForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>
    );
  }
}
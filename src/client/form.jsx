import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      amount: 0
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.sendToken = this.sendToken.bind(this);
  }

  componentDidMount() {
    window.Panda.init(process.env.PANDAPAY_PUBLISHABLE_KEY, 'panda_cc_form');
    window.Panda.on('error', function(errors) {
      // errors is a human-readable list of things that went wrong
      //  (invalid card number, missing last name, etc.)
      console.log(errors);
    });
    window.Panda.on('success', this.sendToken);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  sendToken(cardToken) {
    // You now have a token you can use to refer to that credit card later.
    // This token is used in PandaPay API calls for creating donations and grants
    // so that you don't have to worry about security concerns with dealing with
    // credit card data.
    console.log(cardToken);

    let url;
    if (process.env.NODE_ENV === 'production') {
      url = `https://causefolio.herokuapp.com/donations`;
    } else {
      url = 'http://localhost:2000/donations';
    }

    // create donation
    let info = {
      amount: this.state.amount * 100,
      userFund: false,
      source: cardToken,
      email: this.state.email,
      fundId: this.props.match.params.id
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.history.push(`/form/${data._id}`);
      });
  }

  render() {
    return (
      <form id="panda_cc_form">
        <div>
          <label>Email</label>
          <input type="text" id="email" value={this.state.email} onChange={this.handleEmailChange} />
        </div>

        <div>
          <label>Amount (dollars)</label>
          <input type="text" id="email" value={this.state.amount} onChange={this.handleAmountChange} />
        </div>

        <div>
          <label>First Name</label>
          <input type="text" data-panda="first_name" />
        </div>

        <div>
          <label>Last Name</label>
          <input type="text" data-panda="last_name" />
        </div>

        <div>
          <label>Credit Card Number</label>
          <input type="text" data-panda="credit_card" />
        </div>

        <div>
          <label>Expiration</label>
          <input type="text" data-panda="expiration" />
        </div>

        <div>
          <label>CVV</label>
          <input type="text" data-panda="cvv" />
        </div>

        <div id="tokenize">
          <button type="submit" onSubmit={event => event.preventDefaut()}>
            Donate
          </button>
        </div>
      </form>
    );
  }
}

export default Form;

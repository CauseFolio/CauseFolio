import React from 'react';

class Funds extends React.Component {
  constructor(props) {
    super();
    this.state = {
      fund: undefined,
      funds: []
    };
  }

  componentDidMount() {
    const fundId = this.props.match.params.id;
    // post userfund
    // response is data
    // get the funds
    let url;
    if (process.env.NODE_ENV === 'production') {
      url = `https://causefolio.herokuapp.com/funds`;
    } else {
      url = 'http://localhost:2000/funds';
    }
    // Get fund
    fetch();
    // then get each fund
  }
  render() {
    return <p>FUNDS</p>;
  }
}

export default Funds;

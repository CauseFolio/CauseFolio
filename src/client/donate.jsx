import React from 'react';

class Donate extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch('http://localhost:2000/funds')
      .then(response => response.json())
      .then(data => this.setState({ funds: data }));
  }

  render() {
    if (this.state.funds) {
      return (
        <div>
          <h1>Get Started</h1>
          <h2>Choose 1-3 Cause Funds you care about</h2>
          {this.state.funds.map(fund => {
            return <p key={fund._id}>{fund.name}</p>;
          })}
          <button>Next</button>
        </div>
      );
    }
    return <h1>loading</h1>;
  }
}

export default Donate;

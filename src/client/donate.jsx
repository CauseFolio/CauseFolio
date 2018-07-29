import React from 'react';
import styled from 'styled-components';

const Fund = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;

  &.selected {
    box-shadow: inset 0 0 0 3px green;
    border: 1px solid green;
  }
`;

const HR = styled.hr`
  width: 100px;
  margin-bottom: 50px;
`;

const Funds = styled.div`
  display: grid;
  width: 60%;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 30px;
  grid-column-gap: 30px;
  margin: 40px auto;
`;

const Button = styled.button`
  appearance: none;
  background-color: #1baa1f;
  border: none;
  padding: 20px;
  border-radius: 5px;
  width: 150px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;

class Donate extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedFunds: [],
      funds: []
    };
  }

  componentDidMount() {
    let url;
    if (process.env.NODE_ENV === 'production') {
      url = `https://causefolio.herokuapp.com/funds`;
    } else {
      url = `http://localhost:2000/funds/`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ funds: data }));
  }

  selectFund(fund) {
    if (this.state.selectedFunds.indexOf(fund._id) !== -1) {
      // remove it (toggle)
      this.setState({ selectedFunds: this.state.selectedFunds.filter(savedFund => savedFund !== fund._id) }, () =>
        console.log(this.state.selectedFunds)
      );
    } else {
      if (this.state.selectedFunds.length < 3) {
        this.setState({ selectedFunds: this.state.selectedFunds.concat(fund._id) }, () =>
          console.log(this.state.selectedFunds)
        );
      }
    }
  }

  sendFunds() {
    let url;
    if (process.env.NODE_ENV === 'production') {
      url = `https://causefolio.herokuapp.com/userfunds`;
    } else {
      url = `http://localhost:2000/userfunds`;
    }
    fetch(url, { method: 'POST', body: JSON.stringify(this.state.selectedFunds) })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.history.push(`/form/${data._id}`);
      });
  }

  render() {
    if (this.state.funds) {
      return (
        <div>
          <HR />
          <h1>Get Started</h1>
          <h2>Choose 1-3 Cause Funds you care about</h2>
          <Funds>
            {this.state.funds.map(fund => {
              return (
                <Fund
                  className={this.state.selectedFunds.indexOf(fund._id) !== -1 ? 'selected' : null}
                  onClick={() => this.selectFund(fund)}
                  key={fund._id}
                >
                  {fund.name}
                </Fund>
              );
            })}
          </Funds>
          <Button onClick={() => this.sendFunds()}>Next</Button>
        </div>
      );
    }
    return <h1>loading</h1>;
  }
}

export default Donate;

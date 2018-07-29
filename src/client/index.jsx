import React from 'react';
import ReactDOM from 'react-dom';
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import styled from 'styled-components';
import Typekit from 'react-typekit';
import logo from './logo.svg';

injectGlobal`
  ${styledNormalize}

  body {
    font-family: "brandon-grotesque",sans-serif;
  }

  .center {
    text-align: center;
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px auto auto auto;
  grid-template-areas:
    'header'
    'banner'
    'main'
    'footer';
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.ul`
  display: flex;
  width: 25%;
  list-style-type: none;
  justify-content: space-between;
`;

const Main = styled.main`
  grid-area: main;
`;

const Footer = styled.footer`
  text-align: center;
  grid-area: footer;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background-color: black;
  color: white;
  grid-area: banner;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Callouts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Callout = styled.div`
  text-align: center;
`;

const App = () => (
  <AppContainer className="App">
    <Typekit kitId="has7qkr" />
    <Header>
      <Logo src={logo} alt="CauseFolio" />
      <Nav>
        <li>Donate to a Cause</li>
        <li>My Fund</li>
        <li>About</li>
      </Nav>
    </Header>

    <Banner>
      <h1>1 Donation, Many Impacts</h1>
      <h2>Donate once and send your money to the top charities for the causes you care about</h2>
    </Banner>

    <Main>
      <Callouts>
        <Callout>
          <h3>Maximum Impact</h3>
          <p>
            Cause Funds are a way to donate to a mix of charities that each tackle part of a larger goal. Homelessness,
            animal rights, disaster relief? We take the top charities in the categories you choose and distribute your
            across them.
          </p>
        </Callout>

        <Callout>
          <h3>One Tax Receipt</h3>
          <p>
            No more researching trustworthy charities or doubting whether they follow your values. We only donate to the
            top rated charities for ethics, utilization, and effectiveness. And best of all, you get to donate to many
            charities and get only one receipt!
          </p>
        </Callout>

        <Callout>
          <h3>Donate to a Fund or Create Your Own</h3>
          <p>
            Donate to our funds on Civil Rights, Environment, Arts &amp; Culture, and more. Or, we can create your own
            fund based on your personal preferences that combines all the causes you care about most.
          </p>
        </Callout>
      </Callouts>

      <hr />

      <h2 className="center">Get Started</h2>
      <div>Donate to a Cause Fund</div>
      <div>Create your Own</div>
    </Main>

    <Footer>
      <p>Copyright &copy; CauseFolio</p>
    </Footer>
  </AppContainer>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

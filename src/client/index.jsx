import React from 'react';
import ReactDOM from 'react-dom';
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import styled from 'styled-components';
import Typekit from 'react-typekit';
import logo from './logo.svg';
import banner from './banner.jpg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Donate from './donate.jsx';

injectGlobal`
  ${styledNormalize}

  body {
    font-family: "brandon-grotesque",sans-serif;
    p { color: #604E58; }
    color: #473C43;
  }

  .center {
    text-align: center;
  }

  h1 {
    font-size: 40px;
    margin-bottom: 0;
  }
`;

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 100px auto auto auto;
  grid-template-areas:
    '. header .'
    'banner banner banner'
    '. callouts .'
    'cta cta cta'
    '. footer .';
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-top: -15px;
`;

const Nav = styled.ul`
  display: flex;
  width: 25%;
  list-style-type: none;
  justify-content: space-between;
`;

const Footer = styled.footer`
  text-align: center;
  grid-area: footer;
`;

const HR = styled.hr`
  width: 30%;
  margin-bottom: 30px;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  grid-area: banner;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${banner});
    background-size: cover;
    background-position: center;
    filter: blur(5px);
    z-index: -1;
  }
`;

const Callouts = styled.section`
  grid-area: callouts;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Callout = styled.div`
  line-height: 1.5;
  font-size: 18px;
`;

const CTA = styled.section`
  grid-area: cta;
  text-align: center;
  padding: 30px 0 60px 0;
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
      <h1>One Donation, Many Impacts</h1>
      <h2>Donate once and send your money to the top charities for the causes you care about</h2>
    </Banner>

    <Callouts>
      <Callout>
        <h3>Maximum Impact</h3>
        <p>
          Cause Funds are a way to donate to a mix of charities that each tackle part of a larger goal. Homelessness,
          animal rights, disaster relief? We take the top charities in the categories you choose and distribute your
          money across them.
        </p>
      </Callout>

      <Callout>
        <h3>One Tax Receipt</h3>
        <p>
          No more researching trustworthy charities or doubting whether they follow your values. We only donate to the
          top rated charities for ethics, utilization, and effectiveness. And best of all, you get only one receipt!
        </p>
      </Callout>

      <Callout>
        <h3>Donate to a Fund or Create Your Own</h3>
        <p>
          Donate to our Funds on Civil Rights, Environment, Arts &amp; Culture, and more. Or, we can create a personal
          fund based on your preferences that combines all the causes you care about most.
        </p>
      </Callout>
    </Callouts>

    <CTA>
      <Donate />
    </CTA>

    <Footer>
      <p>Copyright &copy; CauseFolio</p>
    </Footer>
  </AppContainer>
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}

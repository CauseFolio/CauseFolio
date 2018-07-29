import React from 'react';
import ReactDOM from 'react-dom';
import styledNormalize from 'styled-normalize';
import { injectGlobal, styled } from 'styled-components';

injectGlobal`
  ${styledNormalize}
`;

const AppContainer = styled.div`
  display: grid;
`;

const Header = styled.header``;

const Nav = styled.nav``;

const Main = styled.main``;

const Footer = styled.footer`
  text-align: center;
`;

const App = () => (
  <AppContainer className="App">
    <Header>
      <h1 className="App-Title">Hello Parcel x React</h1>
      <Nav>
        <ul>
          <li>Donate to a Cause</li>
          <li>My Fund</li>
          <li>About</li>
        </ul>
      </Nav>
    </Header>

    <Main />

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

import React from 'react';
import ReactDOM from 'react-dom';
import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

injectGlobal`
  ${styledNormalize}
`

const App = () => (
  <div className="App">
    <h1 className="App-Title">Hello Parcel x React</h1>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
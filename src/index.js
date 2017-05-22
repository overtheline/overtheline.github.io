import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello.js';

import App from './App.jsx';

const greeter = new Hello();

console.log(`index.js says ${greeter.greet()}`);

ReactDOM.render(
  <App/>,
  document.getElementById('main')
);

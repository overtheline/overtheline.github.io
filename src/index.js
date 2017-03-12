import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello.js';

const greeter = new Hello();

console.log(`index.js says ${greeter.greet()}`);

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('scroll')
);

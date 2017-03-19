import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello.js';
import Scroll from './components/Scroll.jsx';

const greeter = new Hello();

console.log(`index.js says ${greeter.greet()}`);

ReactDOM.render(
  <Scroll />,
  document.getElementById('scroll')
);

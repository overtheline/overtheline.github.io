import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello.js';
import Scroll2 from './components/Scroll2.jsx';

const greeter = new Hello();

console.log(`index.js says ${greeter.greet()}`);

ReactDOM.render(
  <Scroll2 />,
  document.getElementById('scroll')
);

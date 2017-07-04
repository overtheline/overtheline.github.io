import * as React from "react";

import SVG from './components/svg';

export default class App extends React.Component {

  componentDidMount() {
    SVG();
  }

  render() {
    return (
      <div id='main'>
        Main
      </div>
    );
  }
}

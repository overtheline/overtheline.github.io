import * as React from "react";

import drawTiles from './components/board';

export default class App extends React.Component {

  componentDidMount() {
    drawTiles();
  }

  render() {
    return (
      <div id='main'>
        <svg
          id='base-svg'
          className='board layer-0'
          width={800}
          height={400}
        />
      </div>
    );
  }
}

import * as React from "react";

import { drawTiles, drawObstacles } from './components/board';

const width = 800;
const height = 400;

export default class App extends React.Component {

  componentDidMount() {
    drawTiles();
    drawObstacles(10);
  }

  render() {
    return (
      <div id='main'>
        <svg
          id='svg-layer-0'
          className='board layer-0'
          width={width}
          height={height}
        />
        <svg
          id='svg-layer-1'
          className='board layer-1'
          width={width}
          height={height}
        />
      </div>
    );
  }
}

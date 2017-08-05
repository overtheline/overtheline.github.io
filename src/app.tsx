import * as React from "react";

import Game, { IGameConfig } from './game';

const pxWidth = 750;
const pxHeight = 400;
const tileWidth = 80;
const tileHeight = 40;

const gameConfig: IGameConfig = {
  pxWidth, pxHeight, tileWidth, tileHeight,
};

const boardContainerStyle = {
  width: pxWidth,
  height: pxHeight,
};

export default class App extends React.Component {
  game: Game;
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.game = new Game(gameConfig);
    this.game.init();
  }

  render() {
    console.log('App render');
    return (
      <div id='main'>
        <div
          className='board-container'
          style={boardContainerStyle}
        >
          <svg
            id='svg-layer-0'
            className='board layer-0'
            width={pxWidth}
            height={pxHeight}
          />
          <svg
            id='svg-layer-1'
            className='board layer-1'
            width={pxWidth}
            height={pxHeight}
          />
        </div>
        <div className='text-panel'>
          <p>Press 'space' to start and stop.</p>
        </div>
      </div>
    );
  }
}

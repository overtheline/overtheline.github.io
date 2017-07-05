import * as React from "react";

import Game, { IGameConfig } from './game';

const pxWidth = 800;
const pxHeight = 400;
const tileWidth = 40;
const tileHeight = 20;

const gameConfig: IGameConfig = {
  pxWidth, pxHeight, tileWidth, tileHeight,
};

export default class App extends React.Component {
  game: Game;

  componentDidMount() {
    this.game = new Game(gameConfig);
    this.game.init();
  }

  render() {
    return (
      <div id='main'>
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
    );
  }
}

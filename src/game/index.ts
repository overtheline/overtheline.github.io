import * as d3 from 'd3';

import Board from './components/board';

import { UP, DOWN, LEFT, RIGHT } from './constants/directions';

import getDirection from './utils/direction';
import Loop from './utils/loop';
import distance from './utils/distance';

export interface IGameConfig {
  pxWidth: number;
  pxHeight: number;
  tileWidth: number;
  tileHeight: number;
}

export interface IGameState {
  frame: number;
  direction: string;
  playerAlive: boolean;
  readyToPlay: boolean;
  readyToUpdate: boolean;
}

export default class Game {
  board: Board;
  boardDistance: (x1: number, y1: number, x2: number, y2: number) => number;
  gameState: IGameState;
  lastTime: number;
  loop?: Loop;
  pxHeight: number;
  pxWidth: number;
  targetMS: number;
  tileHeight: number;
  tileWidth: number;

  constructor(config: IGameConfig) {
    this.pxWidth = config.pxWidth;
    this.pxHeight = config.pxHeight;
    this.tileWidth = config.tileWidth;
    this.tileHeight = config.tileHeight;

    // Initial game state
    this.gameState = {
      frame: 0,
      direction: RIGHT,
      playerAlive: false,
      readyToPlay: false,
      readyToUpdate: true,
    }

    // bindings
    this.handleKeydown = this.handleKeydown.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
    this.frameFunction = this.frameFunction.bind(this);

    this.lastTime = 0;
    this.targetMS = 40;

    this.boardDistance = distance(this.tileWidth, this.tileHeight);
  }

  updateGameState(partialState: Partial<IGameState>) {
    this.gameState = (<any>Object).assign({}, this.gameState, partialState);
  }

  frameFunction(elapsed: number) {
    if (elapsed - this.lastTime >= this.targetMS && this.gameState.readyToUpdate) {
      this.updateGameState({ readyToUpdate: false });

      this.board.movePlayer(this.gameState.direction);

      this.board.renderFoodTiles(() => {});
      this.board.renderPlayerTiles(() => { this.updateGameState({ readyToUpdate: true }) });

      this.lastTime = elapsed;
      console.log(this.board.playerTiles[0].x, this.board.playerTiles[0].y,)
      console.log(this.boardDistance(this.board.playerTiles[0].x, this.board.playerTiles[0].y, this.board.foodTiles[0].x, this.board.foodTiles[0].y))
      if(this.boardDistance(this.board.playerTiles[0].x, this.board.playerTiles[0].y, this.board.foodTiles[0].x, this.board.foodTiles[0].y) === 0) {
        console.log('bang');
      }
    }
  }

  init() {
    console.log('game init');
    this.board = new Board(
      this.tileWidth,
      this.tileHeight,
      this.pxWidth,
      this.pxHeight
    );

    d3.select('body').on('keydown', this.handleKeydown);

    // setup
    this.board.createBoard();
    this.board.createPlayer(2, 3);
    this.board.createFood(20, 20);

    this.board.renderBoard(() => this.updateGameState({ readyToPlay: true }));

    this.loop = new Loop(this.frameFunction);
  }

  handleKeydown() {
    console.log(d3.event.keyCode)
    const {
      direction,
      playerAlive,
      readyToPlay,
    } = this.gameState;

    const {
      updateGameState,
    } = this;

    switch(d3.event.keyCode) {
      case 32:
        // SPACE
        if (readyToPlay && !playerAlive) {
          updateGameState({ playerAlive: true });
          this.loop.start();
        }
        break;

      case 38:
        // UP
        updateGameState(getDirection(UP, direction));
        break;

      case 40:
        // DOWN
        updateGameState(getDirection(DOWN, direction));
        break;

      case 37:
        // LEFT
        updateGameState(getDirection(LEFT, direction));
        break;

      case 39:
        // RIGHT
        updateGameState(getDirection(RIGHT, direction));
        break;

      // a
      case 65:
        if (readyToPlay && !playerAlive) {
          updateGameState({ playerAlive: true });
          this.loop.start();
        }
        break;

      // s
      case 83:
        if (readyToPlay && playerAlive) {
          updateGameState({ playerAlive: false });
          this.lastTime = 0;
          this.loop.stop();
        }
        break;

      default:
        return;
    }
  }
}

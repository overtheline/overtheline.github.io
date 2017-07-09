import * as d3 from 'd3';

import Player from './Player';

import Tile from '../components/tile';

import { UP, DOWN, LEFT, RIGHT } from '../constants/directions';

import boardFill from '../utils/boardFill';

export interface IGameConfig {
  pxWidth: number;
  pxHeight: number;
  tileWidth: number;
  tileHeight: number;
}

export interface IGameState {
  nextDirection: string;
  spinning: boolean;
  frames: number;
}

export default class Game {
  boardSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  boardTiles: Tile[];
  gamePieces: Tile[];
  gameState: IGameState;
  gameSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  player: Player;
  playerTiles: Tile[];
  pxWidth: number;
  pxHeight: number;
  tileWidth: number;
  tileHeight: number;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;

  constructor(config: IGameConfig) {
    this.boardSVG = d3.select('#svg-layer-0');
    this.gameSVG = d3.select('#svg-layer-1');

    this.pxWidth = config.pxWidth;
    this.pxHeight = config.pxHeight;
    this.tileWidth = config.tileWidth;
    this.tileHeight = config.tileHeight;

    this.xScale = d3.scaleLinear()
      .domain([0, this.tileWidth]).range([0, this.pxWidth]);
    this.yScale = d3.scaleLinear()
      .domain([0, this.tileHeight]).range([0, this.pxHeight]);

    // Initial game state
    this.gameState = {
      spinning: false,
      frames: 0,
      nextDirection: RIGHT,
    }

    // bindings
    this.handleKeydown = this.handleKeydown.bind(this);
    this.mainLoop = this.mainLoop.bind(this);
    this.runGame = this.runGame.bind(this);
  }

  init() {
    this.boardTiles = this.createBoardTiles();

    this.playerTiles = this.createPlayerTiles();

    this.player = new Player(this.playerTiles);

    this.gamePieces = this.createGamePieces();

    this.drawBoard();

    d3.select('body').on('keydown', this.handleKeydown);
  }

  createBoardTiles(): Tile[] {
    const tiles = [];
    for (let i = 0; i < this.tileWidth; i++) {
      for (let j = 0; j < this.tileHeight; j++) {
        tiles.push(new Tile({
          x: i,
          y: j,
          fill: boardFill(i, j),
        }));
      }
    }

    return tiles;
  }

  createPlayerTiles(): Tile[] {
    const tiles =[];
    for (let i = 0; i < 3; i++) {
      tiles.push(new Tile({
        x: Math.floor(this.tileWidth / 2),
        y: Math.floor(this.tileHeight / 2),
        fill: 'rgba(0, 255, 100, 0.7)',
      }))
    }

    return tiles;
  }

  createGamePieces(): Tile[] {
    return [...this.playerTiles];
  }

  runGame() {
    if (this.gameState.spinning) {
      this.updateGameState({ spinning: false });
    } else {
      this.updateGameState({ spinning: true });
      this.mainLoop();
    }
  }

  mainLoop() {
    if (this.gameState.spinning) {
      this.player.updatePosition(this.gameState.nextDirection);
      this.updateGameState({ frames: this.gameState.frames++});
      this.drawGamePieces();
      setTimeout(this.mainLoop, 50);
    }
  }

  updateGameState(partialState: Partial<IGameState>) {
    this.gameState = (<any>Object).assign({}, this.gameState, partialState);
  }

  drawBoard() {
    this.boardSVG.selectAll('rect')
      .data(this.boardTiles)
      .enter().append('rect')
      .attr('width', this.xScale(1))
      .attr('height', this.yScale(1))
      .attr('x', d => this.xScale(d.x))
      .attr('y', d => this.yScale(d.y))
      .attr('fill', d => d.fill);
  }

  drawGamePieces() {
    // JOIN
    const gamePieces = this.gameSVG.selectAll('rect')
      .data(this.gamePieces);

    // UPDATE
    gamePieces
      .transition().duration(30)
      .attr('x', d => this.xScale(d.x))
      .attr('y', d => this.yScale(d.y));

    // ENTER
    gamePieces.enter().append('rect')
      .attr('width', this.xScale(1))
      .attr('height', this.yScale(1))
      .attr('x', d => this.xScale(d.x))
      .attr('y', d => this.yScale(d.y))
      .attr('fill', d => d.fill);
  }

  handleKeydown() {
    switch(d3.event.keyCode) {
      case 32:
        // SPACE
        this.runGame();
        break;
      case 38:
        // UP
        this.updateGameState({ nextDirection: UP });
        break;
      case 40:
        // DOWN
        this.updateGameState({ nextDirection: DOWN });
        break;
      case 37:
        // LEFT
        this.updateGameState({ nextDirection: LEFT });
        break;
      case 39:
        // RIGHT
        this.updateGameState({ nextDirection: RIGHT });
        break;
      default:
        this.updateGameState({});
        break;
    }
  }
}

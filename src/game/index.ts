import * as d3 from 'd3';

import Tile from './tile';

export interface IGameConfig {
  pxWidth: number;
  pxHeight: number;
  tileWidth: number;
  tileHeight: number;
}

export default class Game {
  boardSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  boardTiles: Tile[];
  frames: number;
  gameSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  pxWidth: number;
  pxHeight: number;
  spinning: boolean;
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

    this.spinning = false;
    this.frames = 0;

    this.handleKeydown = this.handleKeydown.bind(this);
    this.mainLoop = this.mainLoop.bind(this);
    this.runGame = this.runGame.bind(this);
  }

  init() {
    this.boardTiles = this.createBoardTiles();
    this.drawBoard();

    d3.select('body').on('keydown', this.handleKeydown);
  }

  createBoardTiles() {
    function getTileFill(i: number, j: number): string {
      const red = 'rgba(255, 0, 0, 0.5)';
      const black = 'rgba(0, 0, 0, 0.5)';

      return (i + j) % 2 === 0 ? black : red;
    }

    const tiles = [];
    for (let i = 0; i < this.tileWidth; i++) {
      for (let j = 0; j < this.tileHeight; j++) {
        tiles.push(new Tile({
          x: i,
          y: j,
          fill: getTileFill(i, j),
        }));
      }
    }

    return tiles;
  }

  createGamePieces() {}

  runGame() {
    if (this.spinning) {
      this.spinning = false;
    } else {
      this.spinning = true;
      this.mainLoop();
    }
  }

  mainLoop() {
    if (this.spinning) {
      this.frames++;
      console.log('loop', this.frames);
      setTimeout(this.mainLoop, 50);
    }
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

  handleKeydown() {
    switch(d3.event.keyCode) {
      case 32:
        this.runGame();
    }
  }
}

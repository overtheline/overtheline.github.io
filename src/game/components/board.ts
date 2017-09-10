import * as d3 from 'd3';

import Tile from '../tiles/base-tile';
import getPlayerTile from '../tiles/player';
import getFoodTile from '../tiles/food';
import getBlockTile from '../tiles/block';
import checkerFill from '../utils/checker-fill';
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions';
import * as fill from '../constants/colors';

export default class Board {
  boardSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  gameSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  boardTiles: Tile[];
  playerTiles: Tile[];
  foodTiles: Tile[];
  blockTiles: Tile[];

  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;

  tileWidth: number;
  tileHeight: number;
  pxWidth: number;
  pxHeight: number

  constructor(
    tileWidth: number,
    tileHeight: number,
    pxWidth: number,
    pxHeight: number
  ) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.pxWidth = pxWidth;
    this.pxHeight = pxHeight;

    this.boardSVG = d3.select('#svg-layer-0');
    this.gameSVG = d3.select('#svg-layer-1');

    this.xScale = d3.scaleLinear()
      .domain([0, this.tileWidth])
      .range([0, this.pxWidth]);

    this.yScale = d3.scaleLinear()
      .domain([0, this.tileHeight])
      .range([0, this.pxHeight]);
  }

  // BOARD METHODS

  createBoard(): void {
    const boardTiles: Tile[] = [];
    for (let i = 0; i < this.tileWidth; i++) {
      for (let j = 0; j < this.tileHeight; j++) {
        boardTiles.push(new Tile(i, j, checkerFill(i, j, fill.clear, fill.clear), checkerFill(i, j, fill.red, fill.black), checkerFill(i, j, fill.clear, fill.clear)));
      }
    }

    this.boardTiles = boardTiles;
    this.playerTiles = [];
    this.foodTiles = [];
    this.blockTiles = [];
  }

  destroyBoardTiles(): void {
    this.boardTiles = [];
  }

  // PLAYER METHODS

  addPlayerTile(x: number, y: number): void {
    if (this.playerTiles.length) {
      const lastTile = this.playerTiles[this.playerTiles.length - 1];

      this.playerTiles.push(getPlayerTile(lastTile.x, lastTile.y));
    } else {
      this.playerTiles.push(getPlayerTile(x, y));
    }
  }

  movePlayer(nextPlayerDirection: string) {
    const [head] = this.playerTiles;

    for (let i = this.playerTiles.length - 1; i > 0; i--) {
      this.playerTiles[i].x = this.playerTiles[i - 1].x;
      this.playerTiles[i].y = this.playerTiles[i - 1].y;
    }

    switch(nextPlayerDirection) {
      case UP:
        head.y -= 1;
        break;
      case DOWN:
        head.y += 1;
        break;
      case LEFT:
        head.x -= 1;
        break;
      case RIGHT:
        head.x += 1;
        break;
    }
  }

  destroyPlayer(): void {
    this.playerTiles = [];
  }

  // FOOD METHODS

  addFoodTile(x: number, y: number): void {
    this.foodTiles.push(getFoodTile(x, y));
  }

  removeFoodTile(removeObj: Tile): void {
    this.foodTiles = this.foodTiles.filter((foodObj: Tile) => foodObj !== removeObj);
  }

  destroyFood(): void {
    this.foodTiles = [];
  }

  // BLOCK METHODS

  addBlockTile(x: number, y: number): void {
    this.blockTiles.push(getBlockTile(x, y));
  }

  removeBlockTile(removeObj: Tile) {
    this.blockTiles = this.blockTiles.filter((blockObj) => blockObj !== removeObj);
  }

  destroyBlocks(): void {
    this.blockTiles = [];
  }

  // RENDER METHODS

  renderBoard(cb: () => void): void {
    const tiles = this.boardSVG.selectAll('rect')
      .data(this.boardTiles);

    tiles
      .enter().append('rect')
        .attr('width', this.xScale(1))
        .attr('height', this.yScale(1))
        .attr('x', this.xScale(this.tileWidth / 2))
        .attr('y', this.yScale(this.tileHeight / 2))
        .attr('fill', (d: Tile) => d.enterColor)
      .transition().duration(1000).ease(d3.easeBounceOut)
        .attr('y', (d: Tile) => this.yScale(d.y))
        .attr('x', (d: Tile) => this.xScale(d.x))
        .attr('fill', (d: Tile) => d.updateColor)
      .on('end', cb);

    tiles
      .exit()
        .attr('fill', (d: Tile) => d.exitColor)
      .transition().duration(500)
        .attr('x', (d: Tile) => this.xScale(d.x - 0.5))
        .attr('y', (d: Tile) => this.yScale(d.y - 0.5))
        .attr('width', this.xScale(0))
        .attr('height', this.yScale(0))
        .attr('fill', fill.clear);
  }

  renderPlayerTiles(cb: () => void): void {
    this.renderGameTiles(this.playerTiles, 'player-tile', cb);
  }

  renderFoodTiles(cb: () => void): void {
    this.renderGameTiles(this.foodTiles, 'food-tile', cb);
  }

  renderBlockTile(cb: () => void): void {
    this.renderGameTiles(this.blockTiles, 'block-tile', cb);
  }

  private renderGameTiles(tiles: Tile[], targetClass: string, cb: () => void): void {
    // JOIN
    const gamePieces = this.gameSVG.selectAll(`.${targetClass}`).data(tiles);

    // EXIT
    gamePieces.exit()
        .attr('fill', (d: Tile) => d.exitColor)
      .transition().duration(500)
        .attr('x', (d: Tile) => this.xScale(d.x + 0.5))
        .attr('y', (d: Tile) => this.yScale(d.y + 0.5))
        .attr('width', this.xScale(0))
        .attr('height', this.yScale(0))
        .attr('fill', (d: Tile) => fill.clear)
      .remove()
      .on('end', cb);

    // ENTER
    gamePieces
      .enter().append('rect')
        .classed(targetClass, true)
        .attr('x', (d: Tile) => this.xScale(d.x - 1))
        .attr('y', (d: Tile) => this.yScale(d.y - 1))
        .attr('width', this.xScale(3))
        .attr('height', this.yScale(3))
        .attr('fill', (d: Tile) => d.enterColor)
      .transition().duration(100)
        .attr('width', this.xScale(1))
        .attr('height', this.yScale(1))
        .attr('x', (d: Tile) => this.xScale(d.x))
        .attr('y', (d: Tile) => this.yScale(d.y))
        .attr('fill', (d: Tile) => d.updateColor)
      .on('end', cb);

    // UPDATE
    gamePieces
        .attr('x', (d: Tile) => this.xScale((d.x % this.tileWidth) < 0 ? (d.x % this.tileWidth) + this.tileWidth : d.x % this.tileWidth))
        .attr('y', (d: Tile) => this.yScale((d.y % this.tileHeight) < 0 ? (d.y % this.tileHeight) + this.tileHeight : d.y % this.tileHeight))
      .call(cb);
  }
}

import * as d3 from 'd3';

import Tile from './Tile';
import checkerFill from '../utils/checker-fill';
import * as fill from '../constants/colors';

export default class Board {
  boardSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  gameSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  tiles: Tile[];

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

  createBoardTiles() {
    const tiles = [];
    for (let i = 0; i < this.tileWidth; i++) {
      for (let j = 0; j < this.tileHeight; j++) {
        tiles.push(new Tile({
          x: i,
          y: j,
          willEnterColor: fill.clear,
          didEnterColor: checkerFill(i, j),
          updateColor: checkerFill(i, j),
          willExitColor: checkerFill(i, j),
          didExitColor: fill.clear,
        }));
      }
    }

    this.tiles = tiles;
  }

  drawBoard() {
    const boardTiles = this.boardSVG.selectAll('rect')
      .data(this.tiles);

    boardTiles
      .enter().append('rect')
        .attr('width', this.xScale(1))
        .attr('height', this.yScale(1))
        .attr('x', d => this.xScale(d.x))
        .attr('y', d => this.yScale(d.y))
        .attr('fill', d => d.updateColor);
  }

  drawGamePieces(tiles: Tile[], onRenderEnd: () => boolean) {
    // JOIN
    const gamePieces = this.gameSVG.selectAll('rect')
      .data(tiles);

    // EXIT
    gamePieces.exit()
        .attr('fill', (d: Tile) => d.willExitColor)
      .transition().duration(500)
        .attr('x', (d: Tile) => this.xScale(d.x + 0.5))
        .attr('y', (d: Tile) => this.yScale(d.y + 0.5))
        .attr('width', this.xScale(0))
        .attr('height', this.yScale(0))
        .attr('fill', (d: Tile) => d.didExitColor)
      .remove()
      .call(onRenderEnd);

    // UPDATE
    gamePieces
      .transition().duration(30)
        .attr('x', d => this.xScale(d.x))
        .attr('y', d => this.yScale(d.y))
        .attr('fill', (d: Tile) => d.updateColor)
      .call(onRenderEnd);

    // ENTER
    gamePieces
      .enter().append('rect')
        .attr('x', d => this.xScale(d.x - 1))
        .attr('y', d => this.yScale(d.y - 1))
        .attr('width', this.xScale(3))
        .attr('height', this.yScale(3))
        .attr('fill', (d: Tile) => d.willEnterColor)
      .transition().duration(30)
        .attr('width', this.xScale(1))
        .attr('height', this.yScale(1))
        .attr('x', d => this.xScale(d.x))
        .attr('y', d => this.yScale(d.y))
        .attr('fill', (d: Tile) => d.didEnterColor)
      .call(onRenderEnd);
  }
}

import * as d3 from 'd3';

import { drawTiles, drawObstacles } from '../components/board';
import User, { IUserConfig } from '../components/user';

export interface IGameConfig {
  pxWidth: number;
  pxHeight: number;
  tileWidth: number;
  tileHeight: number;
}

export default class Game {
  boardSVG: d3.Selection<SVGElement, {}, HTMLElement, any>;
  pxWidth: number;
  pxHeight: number;
  tileWidth: number;
  tileHeight: number;
  user: User;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;

  constructor(config: IGameConfig) {
    this.boardSVG= d3.select('#svg-layer-0');
    this.pxWidth = config.pxWidth;
    this.pxHeight = config.pxHeight;
    this.tileWidth = config.tileWidth;
    this.tileHeight = config.tileHeight;
    this.user = new User({ x: 5, y: 5, fill: 'rgba(0, 255, 0, 1)' });

    this.xScale = d3.scaleLinear()
      .domain([0, this.tileWidth]).range([0, this.pxWidth]);
    this.yScale = d3.scaleLinear()
      .domain([0, this.tileHeight]).range([0, this.pxHeight]);
  }

  init() {
    drawTiles();
    drawObstacles(10);
    this.drawUser()
  }

  drawUser() {
    const layer_1: d3.Selection<SVGElement, {}, HTMLElement, any> = d3.select('#svg-layer-1');

    layer_1.append('rect')
        .attr('width', this.xScale(1) - 1)
        .attr('height', this.yScale(1) - 1)
        .attr('x', this.xScale(this.user.x))
        .attr('y', this.yScale(this.user.y))
        .attr('fill', this.user.fill);
  }
}

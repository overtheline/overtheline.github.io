export interface ITileConfig {
  x: number;
  y: number;
  fill: string;
};

export default class Tile {
  x: number;
  y: number;
  fill: string;

  constructor(config: ITileConfig) {
    this.x = config.x;
    this.y = config.y;
    this.fill = config.fill;
  }
}

export interface ITileConfig {
  x: number;
  y: number;
  enterColor: string;
  updateColor: string;
  exitColor: string;
};

export default class Tile {
  x: number;
  y: number;
  enterColor: string;
  updateColor: string;
  exitColor: string;

  constructor(config: ITileConfig) {
    this.x = config.x;
    this.y = config.y;
    this.enterColor= config.enterColor;
    this.updateColor= config.updateColor;
    this.exitColor= config.exitColor;
  }
}

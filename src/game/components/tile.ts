export interface ITileConfig {
  x: number;
  y: number;
  willEnterColor: string;
  didEnterColor: string;
  updateColor: string;
  willExitColor: string;
  didExitColor: string;
};

export default class Tile {
  x: number;
  y: number;
  willEnterColor: string;
  didEnterColor: string;
  updateColor: string;
  willExitColor: string;
  didExitColor: string;

  constructor(config: ITileConfig) {
    this.x = config.x;
    this.y = config.y;
    this.willEnterColor= config.willEnterColor;
    this.didEnterColor= config.didEnterColor;
    this.updateColor= config.updateColor;
    this.willExitColor= config.willExitColor;
    this.didExitColor= config.didExitColor;
  }
}

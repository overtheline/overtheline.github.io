export interface IBoardConfig {
  tileWidth: number;
  tileHeight: number;
  pxWidth: number;
  pxHeight: number;
}

export class Board {
  tileWidth: number;
  tileHeight: number;
  pxWidth: number;
  pxHeight: number;

  constructor(config: IBoardConfig) {
    this.tileWidth = config.tileWidth;
    this.tileHeight = config.tileHeight;
    this.pxWidth = config.pxWidth;
    this.pxHeight = config.pxHeight;
  }
}

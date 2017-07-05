import Tile from './tile';

export interface IUserConfig {
  x: number;
  y: number;
  fill: string;
};

export default class User extends Tile {
  constructor(config: IUserConfig) {
    super({ x: config.x, y: config.y, fill: config.fill });
  }
}

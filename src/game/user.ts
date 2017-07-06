import Tile, { ITileConfig } from './tile';

export interface IUserConfig extends ITileConfig {};

export default class User extends Tile {
  constructor(config: IUserConfig) {
    super(config);
  }
}

import Tile from './base-tile';

import * as fill from '../constants/colors';

export default function getBlockTile(x: number, y: number): Tile {
  return new Tile(x, y, fill.blockEnter, fill.blockUpdate, fill.blockExit);
}

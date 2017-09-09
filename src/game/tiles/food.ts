import Tile from './Tile';

import * as fill from '../constants/colors';

export default function getFoodTile(x: number, y: number): Tile {
  return new Tile(x, y, fill.foodEnter, fill.foodUpdate, fill.foodExit);
}

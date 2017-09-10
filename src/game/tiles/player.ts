import Tile from './base-tile';

import * as fill from '../constants/colors';

export default function getPlayerTile(x: number, y: number): Tile {
  return new Tile(x, y, fill.playerEnter, fill.playerUpdate, fill.playerExit);
}

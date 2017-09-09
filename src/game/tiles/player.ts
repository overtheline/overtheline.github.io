import Tile from './Tile';

import * as fill from '../constants/colors';

export default function getPlayerTile(x: number, y: number): Tile {
  return new Tile(x, y, fill.playerEnter, fill.playerUpdate, fill.playerExit);
}

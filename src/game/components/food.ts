import Tile from './Tile';

import * as fill from '../constants/colors';

export default class Food {
  tiles: Tile[];

  getTiles() {
    return this.tiles;
  }

  addFood(x: number, y: number) {
    this.tiles = [
      new Tile({
        x,
        y,
        enterColor: fill.foodEnter,
        updateColor: fill.foodUpdate,
        exitColor: fill.foodExit,
      }),
    ];
  }
}

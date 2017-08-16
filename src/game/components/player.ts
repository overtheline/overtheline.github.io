import Tile from './Tile';

import { UP, DOWN, LEFT, RIGHT } from '../constants/directions';
import * as fill from '../constants/colors';

export default class Player {
  currentDirection: string;
  tiles: Tile[];
  status: string;

  constructor(x: number, y: number) {
    this.currentDirection = RIGHT;
    this.tiles = [];

    for (let i = 0; i < 15; i++) {
      this.tiles.push(new Tile({
        x,
        y,
        enterColor: fill.playerEnter,
        updateColor: fill.playerUpdate,
        exitColor: fill.playerExit,
      }))
    }
  }

  getTiles() {
    return this.tiles;
  }

  updatePosition(nextDirection: string) {
    const [head] = this.tiles;

    // Do not back up on yourself
    if (
      (nextDirection === UP && this.currentDirection !== DOWN)
      || (nextDirection === DOWN && this.currentDirection !== UP)
      || (nextDirection === RIGHT && this.currentDirection !== LEFT)
      || (nextDirection === LEFT && this.currentDirection !== RIGHT)
    ) {
      this.currentDirection = nextDirection
    }

    for (let i = this.tiles.length - 1; i > 0; i--) {
      this.tiles[i].x = this.tiles[i - 1].x;
      this.tiles[i].y = this.tiles[i - 1].y;
    }

    switch(this.currentDirection) {
      case UP:
        head.y -= 1;
        break;
      case DOWN:
        head.y += 1;
        break;
      case LEFT:
        head.x -= 1;
        break;
      case RIGHT:
        head.x += 1;
        break;
    }
  }
}

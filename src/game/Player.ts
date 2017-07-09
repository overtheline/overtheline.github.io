import Tile from '../components/tile';

import { UP, DOWN, LEFT, RIGHT } from '../constants/directions';

export default class Player {
  currentDirection: string;

  constructor(private playerTiles: Tile[]) {
    this.currentDirection = RIGHT;
  }

  updatePosition(nextDirection: string) {
    if (
      (nextDirection === UP && this.currentDirection !== DOWN)
      || (nextDirection === DOWN && this.currentDirection !== UP)
      || (nextDirection === RIGHT && this.currentDirection !== LEFT)
      || (nextDirection === LEFT && this.currentDirection !== RIGHT)
    ) {
      this.currentDirection = nextDirection
    }

    for (let i = this.playerTiles.length - 1; i > 0; i--) {
      this.playerTiles[i].x = this.playerTiles[i - 1].x;
      this.playerTiles[i].y = this.playerTiles[i - 1].y;
    }

    switch(this.currentDirection) {
      case UP:
        this.playerTiles[0].y -= 1;
        break;
      case DOWN:
        this.playerTiles[0].y += 1;
        break;
      case LEFT:
        this.playerTiles[0].x -= 1;
        break;
      case RIGHT:
        this.playerTiles[0].x += 1;
        break;
    }
  }
}

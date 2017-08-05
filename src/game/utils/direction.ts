import * as dir from '../constants/directions';

export default function getDirection(nextDirection: string, prevDirection: string): { direction: string } {
  if (
    (nextDirection === dir.DOWN && prevDirection !== dir.UP)
    || (nextDirection === dir.UP && prevDirection !== dir.DOWN)
    || (nextDirection === dir.LEFT && prevDirection !== dir.RIGHT)
    || (nextDirection === dir.RIGHT && prevDirection !== dir.LEFT)
  ) {
    return { direction: nextDirection };
  }

  return { direction: prevDirection };
}

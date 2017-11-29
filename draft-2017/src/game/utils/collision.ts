import Tile from '../tiles/base-tile';

export default function collision(subject: Tile, objects: Tile[], distance: (x1: number, y1: number, x2: number, y2: number) => number): boolean {
  return objects.reduce((hit, object) => {
    if (hit) { return hit; }
    return distance(object.x, object.y, subject.x , subject.y) === 0;
  }, false);
}

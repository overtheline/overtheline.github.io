import Tile from '../components/Tile';

export default function collision(subject: Tile, objects: Tile[]): boolean {
  return objects.reduce((hit, object) => {
    if (hit) { return hit; }
    return object.x === subject.x && object.y === subject.y;
  }, false);
}
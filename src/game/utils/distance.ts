import torusScale from './torus-scale';

export default function(modX: number, modY: number): (x1: number, y1: number, x2: number, y2: number) => number {
  const modXScale = torusScale(modX);
  const modYScale = torusScale(modY);

  return function modDistance(x1, y1, x2, y2) {
    return Math.abs(modXScale(x1) - modXScale(x2)) + Math.abs(modYScale(y1) - modYScale(y2));
  }
}

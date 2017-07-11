const red = 'rgba(255, 0, 0, 0.1)';
const black = 'rgba(0, 0, 0, 0.1)';

export default function boardFill(i: number, j: number): string {
  return (i + j) % 2 === 0 ? black : red;
}

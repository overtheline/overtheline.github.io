import { red, black } from '../constants/colors';

export default function boardFill(i: number, j: number): string {
  return (i + j) % 2 === 0 ? black : red;
}

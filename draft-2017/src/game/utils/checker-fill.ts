export default function checkerFill(i: number, j: number, fillA: string, fillB: string): string {
  return (i + j) % 2 === 0 ? fillA : fillB;
}

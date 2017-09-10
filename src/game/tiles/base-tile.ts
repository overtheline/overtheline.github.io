export default class Tile {
  x: number;
  y: number;
  enterColor: string;
  updateColor: string;
  exitColor: string;

  constructor(x: number, y: number, enterColor: string, updateColor: string, exitColor: string) {
    this.x = x;
    this.y = y;
    this.enterColor= enterColor;
    this.updateColor= updateColor;
    this.exitColor= exitColor;
  }
}

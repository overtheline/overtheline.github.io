import * as d3 from 'd3';

const boardDimensions = {
  width: 40,
  height: 20,
};

export default function drawTiles() {
  const base: d3.Selection<SVGElement, {}, HTMLElement, any> = d3.select('#base-svg');

  const width: number = Number(base.attr('width'));
  const height: number = Number(base.attr('height'));

  const tileWidth = Math.floor(width / boardDimensions.width);
  const tileHeight = Math.floor(height / boardDimensions.height);

  function getTileFill(i: number, j: number): string {
    const red = 'rgba(255, 0, 0, 0.5)';
    const black = 'rgba(0, 0, 0, 0.5)';

    return (i + j) % 2 === 0 ? black : red;
  }

  for (let i = 0; i < boardDimensions.width; i++) {
    for (let j = 0; j < boardDimensions.height; j++) {
      const xPos = i * tileWidth;
      const yPos = j * tileHeight;

      base.append('rect')
          .attr('width', tileWidth - 1)
          .attr('height', tileHeight - 1)
          .attr('x', xPos)
          .attr('y', yPos)
          .attr('fill', getTileFill(i, j));
    }
  }
}

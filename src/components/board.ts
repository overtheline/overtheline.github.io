import * as d3 from 'd3';

const boardDimensions = {
  width: 40,
  height: 20,
};

export function drawTiles(): void {
  const base: d3.Selection<SVGElement, {}, HTMLElement, any> = d3.select('#svg-layer-0');

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

export function drawObstacles(n: number): void {
  const layer_1: d3.Selection<SVGElement, {}, HTMLElement, any> = d3.select('#svg-layer-1');

  const width: number = Number(layer_1.attr('width'));
  const height: number = Number(layer_1.attr('height'));

  const tileWidth = Math.floor(width / boardDimensions.width);
  const tileHeight = Math.floor(height / boardDimensions.height);

  function getRandomPosition() {
    const x = Math.floor(Math.random() * boardDimensions.width) * tileWidth;
    const y = Math.floor(Math.random() * boardDimensions.height) * tileHeight;

    return { x, y };
  }

  function generateObstacles(n: number): { x: number, y: number }[] {
    const obstacles = [];
    for ( let i = 0; i < n; i++) {
      obstacles.push(getRandomPosition());
    }

    return obstacles;
  }

  for (let i = 0; i < n; i++) {
    const pos = getRandomPosition();
    layer_1.append('rect')
        .attr('width', tileWidth - 1)
        .attr('height', tileHeight - 1)
        .attr('x', pos.x)
        .attr('y', pos.y)
        .attr('fill', 'rgba(200, 100, 0, 1)');
  }
}

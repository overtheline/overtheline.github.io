const svgContainer = d3.select('.svg-container');

svgContainer.append('svg')
    .attr('id', 'svg-one')
    .attr('height', 500)
    .attr('width', 800)

const svgOne = d3.select('#svg_one');
const numberGenerator = d3.randomNormal(1, 0.3);

const data = Array(20).fill(1).map(() => numberGenerator());
console.log(data);

class TimeOutLoop {

}

import { scaleLinear } from 'd3-scale';
import { D3ScaleLinear, D3Selection } from '../../types';
import BaseComponent from '../base-component';
import Dot from '../dot';

const sideLength = 500;
const xDomain = [-10, 10];
const yDomain = [-10, 10];
const rDomain = [0, 20];

export default class DotGraph extends BaseComponent {
	width: number;
	height: number;
	xScale: D3ScaleLinear;
	yScale: D3ScaleLinear;
	rScale: D3ScaleLinear;

	constructor(target: D3Selection) {
		super(target);
		
		this.width = sideLength;
		this.height = sideLength;
		this.xScale = scaleLinear().domain(xDomain).range([0, sideLength]);
		this.yScale = scaleLinear().domain(yDomain).range([sideLength, 0]);
		this.rScale = scaleLinear().domain(rDomain).range([0, sideLength]);
	}

	render() {
		const svg = this.target.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
				.classed('dot-graph', true);

		const makeDot = Dot.createDotFactory(svg, this.xScale, this.yScale, this.rScale);

		const dotParams = [
			[-5, 1, 0.5],
			[1, 1, 0.5],
			[1, -5, 0.5],
			[-5, -5, 0.5],
			[-2, 2, 0.4],
			[4, 2, 0.4],
			[4, -4, 0.4],
			[-2, -4, 0.4],
		];

		const dots = dotParams.map(dot => makeDot.apply(null, dot));
		dots.forEach(dot => dot.render());
	}
}
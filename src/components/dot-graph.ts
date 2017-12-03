import { scaleLinear, ScaleLinear } from 'd3-scale';
import { D3Selection } from '../types';
import BaseComponent from './base-component';
import Dot from './dot';

const width = 400;
const height = width;

export default class DotGraph extends BaseComponent {
	width: number;
	height: number;
	xScale: ScaleLinear<number, number>;
	yScale: ScaleLinear<number, number>;
	rScale: ScaleLinear<number, number>;

	constructor(target: D3Selection) {
		super(target);
		
		this.width = width;
		this.height = height;
		this.xScale = scaleLinear().domain([-10, 10]).range([0, width]);
		this.yScale = scaleLinear().domain([-10, 10]).range([height, 0]);
		this.rScale = scaleLinear().domain([0, 20]).range([0, width]);
	}

	render() {
		const svg = this.target.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
				.classed('dot-graph', true);

		const dot = new Dot({
			target: svg,
			cx: this.xScale(0),
			cy: this.yScale(0),
			r: this.rScale(3)
		});

		dot.render();
	}
}
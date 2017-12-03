import { scaleLinear, ScaleLinear } from 'd3-scale';
import { D3Selection } from '../types';
import BaseComponent from './base-component';
import Dot from './dot';

export default class DotGraph extends BaseComponent {
	width: number;
	height: number;
	xScale: ScaleLinear<number, number>;
	yScale: ScaleLinear<number, number>;

	constructor(target: D3Selection) {
		super(target);
		this.width = 400;
		this.height = 500;
		this.xScale = scaleLinear().domain([0, 40]).range([0, 400]);
		this.yScale = scaleLinear().domain([0, 50]).range([500, 0]);
	}

	render() {
		const svg = this.target.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
				.classed('dot-graph', true);

		const dot = new Dot({
			target: svg,
			cx: this.xScale(20),
			cy: this.yScale(25),
			r: this.xScale(3)
		});

		dot.render();
	}
}
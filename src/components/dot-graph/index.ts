import { scaleLinear } from 'd3-scale';
import { transition } from 'd3-transition';
import { D3ScaleLinear, D3Selection, D3Transition } from '../../types';
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
	svg?: D3Selection;
	dotFactory: (cx: number, cy: number, r: number) => Dot;
	transition: D3Transition;

	constructor(target: D3Selection) {
		super(target);
		
		this.width = sideLength;
		this.height = sideLength;

		this.svg = this.target.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
				.classed('dot-graph', true);

		this.xScale = scaleLinear().domain(xDomain).range([0, sideLength]);
		this.yScale = scaleLinear().domain(yDomain).range([sideLength, 0]);
		this.rScale = scaleLinear().domain(rDomain).range([0, sideLength]);

		this.dotFactory = Dot.createDotFactory(this.svg, this.xScale, this.yScale, this.rScale);

		this.transition = transition().duration(750);
	}
}
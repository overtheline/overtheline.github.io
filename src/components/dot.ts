import { D3Selection } from '../types';
import BaseComponent from './base-component';

interface IProps {
	target: D3Selection;
	cx: number;
	cy: number;
	r: number;
}

export default class DotGraph extends BaseComponent {
	cx: number;
	cy: number;
	r: number;

	constructor({target, cx, cy, r}: IProps) {
		super(target);
		this.cx = cx;
		this.cy = cy;
		this.r = r;
	}

	render() {
		this.target.append('circle')
				.attr('cx', this.cx)
				.attr('cy', this.cy)
				.attr('r', this.r)
				.attr('fill', 'steelblue')
				.classed('circle', true);
	}
}
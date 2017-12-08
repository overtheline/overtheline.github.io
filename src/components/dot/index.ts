import { D3ScaleLinear, D3Selection } from '../../types';
import BaseComponent from '../base-component';

interface IProps {
	target: D3Selection;
	cx: number;
	cy: number;
	r: number;
}

export default class Dot extends BaseComponent {
	cx: number;
	cy: number;
	r: number;

	static createDotFactory(target: D3Selection, xScale: D3ScaleLinear, yScale: D3ScaleLinear, rScale: D3ScaleLinear) {
		return (cx: number, cy: number, r: number) => new Dot({
			target,
			cx: xScale(cx),
			cy: yScale(cy),
			r: rScale(r),
		})
	}

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
				.attr('fill', 'rgb(255, 0, 0')
				.classed('circle', true);
	}
}
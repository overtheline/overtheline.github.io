import { D3ScaleLinear, D3Selection } from '../../types';
import BaseComponent from '../base-component';

interface IProps {
	width: number;
	height: number;
	x: number;
	y: number;
	fill: string;
	class: string;
}

export default class Rect extends BaseComponent {
	width: number;
	height: number;
	x: number;
	y: number;
	scale: D3ScaleLinear;
	element: D3Selection;

	static createRectFactory(target: D3Selection, scale: D3ScaleLinear) {
		return (width: number, height: number, x: number, y: number) => new Rect(target, width, height, x, y, scale);
	}

	constructor(target: D3Selection, width: number, height: number, x: number, y: number, scale: D3ScaleLinear) {
		super(target);
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.scale = scale;
	}

	update(props: Partial<IProps>) {
		for (let key in props) {
			const values: {[key: string]: any} = props;
			this.element.attr(key, values[key]);
		}
	}

	render() {
		this.element = this.target.append('rect')
				.attr('width', this.scale(this.width))
				.attr('height', this.scale(this.height))
				.attr('x', this.scale(this.x))
				.attr('y', this.scale(this.y))
				.attr('fill', 'rgba(255, 0, 0, 0')
				.classed('rect', true);
	}
}
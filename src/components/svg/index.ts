import { D3ScaleLinear, D3Selection } from '../../types';
import BaseComponent from '../base-component';

export default class Svg extends BaseComponent {
	width: number;
	height: number;
	scale: D3ScaleLinear;
	svg: D3Selection;

	constructor(target: D3Selection, width: number, height: number, scale: D3ScaleLinear) {
		super(target);
		
		this.width = width;
		this.height = height;

		this.scale = scale;

		this.svg = this.target.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
				.classed('svg-component', true);
	}

	getSelection() {
		return this.svg;
	}
}

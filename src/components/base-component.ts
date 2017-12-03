import { D3Selection } from '../types';

export default class BaseComponent {
	target: D3Selection;

	constructor(target: D3Selection) {
		this.target = target;
	}
}
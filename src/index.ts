import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import Svg from './components/svg';
import Rect from './components/rect';
import { lfsr } from './utils/lfsr';

const width = 265;
const height = width;
const domain = [0, 16];
const range = [0, width];
const scale = scaleLinear().domain(domain).range(range);

const d3Content = select('#content');

const lfsrSvg = new Svg(d3Content, width, height, scale);

const rectFactory = Rect.createRectFactory(lfsrSvg.getSelection(), scale);

const rects: Rect[] = [];

for (let i = 0; i < domain[1]; i++) {
	for (let j = 0; j < domain[1]; j++) {
		rects.push(rectFactory(1, 1, i, j));
	}
}

console.log(rects.length);

const tap = parseInt('B2', 16);
let count = 0;
const first = lfsr(1, tap);
let last = first;

const interval = setInterval(() => {
	console.log(last, last > rects.length);
	if (last - 1 < rects.length) {
		rects[last - 1].render();
	}
	last = lfsr(last, tap);
	if (last === first) {
		count++;
	}
	if (count > 5) {
		clearInterval(interval);
	}
}, 30);
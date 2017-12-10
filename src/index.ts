import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { timer } from 'd3-timer';
import Svg from './components/svg';
import Rect from './components/rect';
import { lfsr } from './utils/lfsr';

const tileX = 65;
const tileY = 63;
const tileW = 5;
const width = tileX * tileW;
const height = tileY * tileW;
const domain = [0, tileX];
const range = [0, width];
const scale = scaleLinear().domain(domain).range(range);

const colors = ['Red', 'Indigo', 'Steelblue', 'Tomato', 'RosyBrown', 'Gold'];

function getFill(count: number) {
	return colors[count];
}

const d3Content = select('#content');

const lfsrSvg = new Svg(d3Content, width, height, scale);

const rectFactory = Rect.createRectFactory(lfsrSvg.getSelection(), scale);

const rects: Rect[] = [];

for (let i = 0; i < tileX; i++) {
	for (let j = 0; j < tileY; j++) {
		rects.push(rectFactory(1, 1, i, j));
	}
}

rects.forEach(rect => rect.render());

const taps = [
'8EF',
'906',
'91B',
'91E',
'933',
'939',
'93F',
];

let count = 0;
let tap = parseInt(taps[count], 16);
const first = lfsr((tileX * tileY + 1) / 2, tap);
let last = first;

let calls = 0;

const d3Timer = timer((elapsed) => {
	if (last - 1 < rects.length) {
		rects[last - 1].update({ fill: getFill(count)});
		calls++;
	} 
	last = lfsr(last, tap);
	if (last === first) {
		count++;
		tap = parseInt(taps[count], 16);
		console.log('avg: ', elapsed / calls);
	}
	if (count > 5) {
		d3Timer.stop();
	}
});
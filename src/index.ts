import { select } from 'd3-selection';
import Test from './components/test';
import CheckBox from './components/check-box';

function add(x: number, y: number): number {
	return x + y;
}

function sayThing(greeting: string, name: string): string {
	return `${greeting} ${name}.`;
}

const props = {
	foo: 'Hello',
	bar: add,
	baz: sayThing,
}

const test = new Test(props);

const d3ContentDiv = select('#content').append('div');
d3ContentDiv.text(test.sayStr('Jimbob'));

const checkbox = new CheckBox({
	target: d3ContentDiv,
	evtHandler (this, d, i, n) {
		console.log(this, d, i, n);
	}
});

checkbox.render();

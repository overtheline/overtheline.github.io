import { select } from 'd3-selection';
import Test from './components/test';

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

const d3Div = select('#content').append('div');
d3Div.text(test.sayStr('Jimbob'));
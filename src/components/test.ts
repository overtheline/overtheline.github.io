import { numFn, strFn } from '../types/test';

interface IProps {
	foo: string;
	bar: numFn;
	baz: strFn;		
}

export default class Test {
	private foo: string;
	private bar: numFn;
	private baz: strFn;

	constructor({foo, bar, baz}: IProps) {
		this.foo = foo;
		this.bar = bar;
		this.baz = baz;
	}

	binOp(x: number, y: number): number {
		return this.bar(x, y);
	}

	sayStr(inputStr: string): string {
		return this.baz(this.foo, inputStr);
	}
}
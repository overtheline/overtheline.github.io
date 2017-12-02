import { Selection, ValueFn} from 'd3-selection';

interface IProps {
	target: Selection<any, any, any, any>;
	evtHandler: ValueFn<any, any, any>;
}

export default class CheckBox {
	private target: Selection<any, any, any, any>;
	private evtHandler: ValueFn<any, any, any>;

	constructor({target, evtHandler}: IProps) {
		this.target = target;
		this.evtHandler = evtHandler;
	}

	render(): void {
		this.target.append('input')
			.attr('type', 'checkbox')
			.on('change', this.evtHandler);
	}
}
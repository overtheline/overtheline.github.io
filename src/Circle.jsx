import React from 'react';
import ReactDOM from 'react-dom';

import { select } from 'd3';

import circleUpdate from './circleUpdate';

export default class Circle extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const parent = ReactDOM.findDOMNode(this);
      const circle = select(parent);
      circle.transition()
        .attr('cx', 10)
        .attr('cy', 10)
        .attr('r', 10);
    }

    componentWillUpdate(nextProps) {
      circleUpdate(nextProps);
    }

    shouldComponentUpdate(nextProps) {
      const cx = nextProps.cx !== this.props.cx;
      const cy = nextProps.cy !== this.props.cy;
      const r = nextProps.r !== this.props.r;

      if (cx || cy || r) {
        this.props = { cx, cy, r };
        circleUpdate(nextProps);
      }

      return false;
    }

    render() {
      console.count('render circle')
      return (
        <circle className={this.props.className}></circle>
      );
    }
}

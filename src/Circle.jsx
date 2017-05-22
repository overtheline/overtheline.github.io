import React from 'react';
import ReactDOM from 'react-dom';

import { select } from 'd3';

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
      const { cx, cy, r } = nextProps;

      const parent = ReactDOM.findDOMNode(this);
      const circle = select(parent);
      circle.transition()
        .duration(2000)
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r);
    }

    shouldComponentUpdate(nextProps) {
      const cx = nextProps.cx !== this.props.cx;
      const cy = nextProps.cy !== this.props.cy;
      const r = nextProps.r !== this.props.r;

      return cx || cy || r;
    }

    render() {
      console.count('render circle')
      return (
        <circle></circle>
      );
    }
}

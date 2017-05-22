import React from 'react';
import ReactDOM from 'react-dom';

import { select } from 'd3';

export default class AD3 extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const parent = ReactDOM.findDOMNode(this);
      const div = select(parent).html('hello');
      div.transition()
        .duration(2000)
        .style('margin-top', '100px');
    }

    componentWillUpdate(nextProps) {
      const parent = ReactDOM.findDOMNode(this);
      const div = select(parent).html('hello');
      div.transition()
        .duration(2000)
        .style('margin-top', nextProps.offsetTop + 'px');
    }

    shouldComponentUpdate(nextProps) {
      return nextProps.offsetTop !== this.props.offsetTop
    }

    render() {
      console.count('render AD3')
      return (
        <div></div>
      );
    }
}

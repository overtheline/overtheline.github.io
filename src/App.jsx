import React from 'react';

import AD3 from './AD3.jsx';
import Circle from './Circle.jsx';

const wrapperStyle = { display: 'flex', width: '100%' };
const svgStyle = { border: '1px solid black' }
const thingHolder = { flex: '1 1 auto' };

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onMoveClick = this.onMoveClick.bind(this);
    this.onOtherClick = this.onOtherClick.bind(this);

    this.state = {
      offsetTop: 100,
      cx: 10,
      cy: 10,
      r: 10,
    }
  }

  onMoveClick() {
    this.setState({ offsetTop: Math.floor(Math.random() * 500)});
  }

  onOtherClick() {
    const nextR = Math.floor(Math.random() * 40) + 10;
    const nextCX = Math.floor(Math.random() * (300 - nextR - nextR)) + nextR;
    const nextCY = Math.floor(Math.random() * (400 - nextR - nextR)) + nextR;

    this.setState({
      cx: nextCX,
      cy: nextCY,
      r: nextR,
    });
  }

  render() {
    const { offsetTop, cx, cy, r } = this.state;
    return (
      <div>
        <div style={wrapperStyle}>
          <button
            onClick={this.onMoveClick}
          >
            {'move hello'}
          </button>
          <button
            onClick={this.onOtherClick}
          >
            {'move circle'}
          </button>
        </div>
        <div style={wrapperStyle}>
          <div style={thingHolder}>
            <div>{`offset is ${offsetTop}px`}</div>
            <AD3 offsetTop={offsetTop} />
          </div>
          <div style={thingHolder}>
            <div>{`cx: ${cx}, cy: ${cy}, r: ${r}`}</div>
            <svg width={'300px'} height={'400px'} style={svgStyle}>
              <Circle
                cx={cx}
                cy={cy}
                r={r}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

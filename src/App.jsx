import React from 'react';

import AD3 from './AD3.jsx';
import Circle from './Circle.jsx';

const wrapperStyle = { display: 'flex', width: '100%' };
const svgStyle = { border: '1px solid black' }
const thingHolder = { flex: '1 1 auto' };

function generateData(n) {
  const data = [];


  for (let i = 0; i < n; i++) {
    const r = Math.floor(Math.random() * 3) + 2;
    const cx = Math.floor(Math.random() * (300 - r - r)) + r;
    const cy = Math.floor(Math.random() * (400 - r - r)) + r;
    data.push({ r, cx, cy, className: `circle-${i}` });
  }

  return data;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onMoveClick = this.onMoveClick.bind(this);
    this.onOtherClick = this.onOtherClick.bind(this);

    this.state = {
      offsetTop: 100,
      data: generateData(500),
    }
  }

  static createCircles(data) {
    const children = [];

    for (let i = 0; i < data.length; i++) {
      children.push(
        <Circle key={i} className='circle' {...data[i]} />
      );
    }

    return children;
  }

  onMoveClick() {
    this.setState({ offsetTop: Math.floor(Math.random() * 500)});
  }

  onOtherClick() {
    this.setState({
      data: generateData(500),
    });
  }

  render() {
    console.count('App');
    const { offsetTop, data } = this.state;
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
            <svg width={'300px'} height={'400px'} style={svgStyle}>
              {App.createCircles(data)}
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

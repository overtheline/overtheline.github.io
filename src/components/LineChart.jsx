import React from 'react';
import {
  AxisChart,
  XAxis,
  YAxis,
} from 'ihme-ui';
import AnimatedLine from './AnimatedLine.jsx';

const domain = [0, 20];
const range = [0, 100];

function getRandom(range) {
  return Math.random() * (range[1] - range[0]) + range[0];
}

function generateWalkData(n, domain, range) {
  const data = [];

  const alpha = (range[1] - range[0]) / 10;
  const step = (domain[1] - domain[0]) / n;

  for (let i = 0; i <= n; i++) {
    const nextX = domain[0] + (step * i);
    if (!data.length) {
      data.push({ x: nextX, y: getRandom(range) });
    } else {
      const prevY = data[i - 1].y;
      let nextY = getRandom([prevY - alpha, prevY + alpha]);

      if (nextY < range[0]) {
        nextY = -nextY;
      } else if (nextY > range[1]) {
        nextY = nextY - 2 * (nextY - range[1]);
      }

      data.push({
        x: nextX,
        y: nextY
      });
    }
  }

  return data;
}

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
    setInterval(this.getData, 2000);
  }

  getData() {
    this.setState({
      data: generateWalkData(10, domain, range)
    });
  }

  render() {
    return (
      <AxisChart
        height={300}
        width={300}
        xDomain={domain}
        yDomain={range}
      >
        <XAxis />
        <YAxis />
        <AnimatedLine
          data={this.state.data}
          dataAccessors={{ x: 'x', y: 'y' }}
        />
      </AxisChart>
    );
  }
}

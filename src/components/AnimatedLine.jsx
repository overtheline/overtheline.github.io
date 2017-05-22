import React from 'react';
import { Line } from 'ihme-ui';
import { VictoryTransition } from 'victory';

export default class AnimatedLine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <VictoryTransition
        animate={{
          duration: 500,
          onLoad: {duration: 200},
          onEnter: {
            duration: 200,
            before: () => ({y: 0})
          }
        }}
        animationWhitelist={['data']}
      >
        <Line
          {...this.props}
        />
      </VictoryTransition>
    );
  }
}

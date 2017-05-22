import { select } from 'd3';

export default function circleUpdate(props) {
  const { cx, cy, r } = props;

  const circle = select(`.${props.className}`);
  circle.transition()
    .duration(2000)
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', r);
}

import * as d3 from 'd3';

const mainDiv = d3.select('#main');
const mainSelect = mainDiv.append('select');

const options = [
  {
    value: 1,
    text: 'one',
  },
  {
    value: 2,
    text: 'two',
  },
  {
    value: 3,
    text: 'three',
  },
];

options.forEach((option) => {
  mainSelect.append('option')
    .attr('value', option.value)
    .text(option.text);

    const mainOptions = d3.selectAll('option')
      .on('change', () => {
        console.log(this);
        console.log(d3.event);
      });
});

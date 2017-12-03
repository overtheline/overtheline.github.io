import { select } from 'd3-selection';
import DotGraph from './components/dot-graph';

const d3Content = select('#content');

const dotGraph = new DotGraph(d3Content);

dotGraph.render();
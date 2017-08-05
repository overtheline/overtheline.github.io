import * as d3 from 'd3';

export default class Loop {
  timer: d3.Timer;
  cb: (elapsed: number) => void;
  constructor(cb: (elapsed: number) => void) {
    this.cb = cb
    this.timer = d3.timer(cb);
    this.timer.stop();

    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
  }

  stop() {
    this.timer.stop();
  }

  start() {
    this.timer.restart(this.cb);
  }
}

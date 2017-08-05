"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var Loop = (function () {
    function Loop(cb) {
        this.cb = cb;
        this.timer = d3.timer(cb);
        this.timer.stop();
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
    }
    Loop.prototype.stop = function () {
        this.timer.stop();
    };
    Loop.prototype.start = function () {
        this.timer.restart(this.cb);
    };
    return Loop;
}());
exports.default = Loop;
//# sourceMappingURL=loop.js.map
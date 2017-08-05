"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var GameLoop = (function () {
    function GameLoop(cb) {
        this.cb = cb;
        this.timer = d3.timer(cb);
        this.timer.stop();
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
    }
    GameLoop.prototype.stop = function () {
        this.timer.stop();
    };
    GameLoop.prototype.start = function () {
        this.timer.restart(this.cb);
    };
    return GameLoop;
}());
exports.default = GameLoop;
//# sourceMappingURL=Timer.js.map
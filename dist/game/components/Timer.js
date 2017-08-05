"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var GameLoop = (function () {
    function GameLoop(cb) {
        this.timer = d3.timer(cb).stop();
    }
    GameLoop.prototype.stop = function () {
        this.timer.stop();
    };
    GameLoop.prototype.start = function () {
        this.timer.restart();
    };
    return GameLoop;
}());
exports.default = GameLoop;
function log(m) {
    console.log(m);
}
var t = new GameLoop(log);
t.start();
setTimeout(t.stop, 1000);
setTimeout(t.start, 1000);
setTimeout(t.stop, 500);
//# sourceMappingURL=Timer.js.map
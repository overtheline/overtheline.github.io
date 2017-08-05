"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = (function () {
    function Queue() {
        this.headIndex = 1;
        this.tailIndex = 1;
        this.storage = {};
    }
    Queue.prototype.size = function () {
        return this.tailIndex - this.headIndex;
    };
    Queue.prototype.enqueue = function (data) {
        this.storage[this.tailIndex] = data;
        this.tailIndex++;
    };
    Queue.prototype.dequeue = function () {
        if (this.tailIndex !== this.headIndex) {
            var output = this.storage[this.headIndex];
            delete this.storage[this.headIndex];
            this.headIndex++;
            return output;
        }
    };
    Queue.prototype.reset = function () {
        this.headIndex = 1;
        this.tailIndex = 1;
        this.storage = {};
    };
    return Queue;
}());
exports.default = Queue;
//# sourceMappingURL=queue.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var queue_1 = require("../queue");
describe('Queue', function () {
    var queue = new queue_1.default();
    it('returns the size of the queue', function () {
        chai_1.expect(queue.size()).to.equal(0);
    });
    it('enqueues data', function () {
        queue.enqueue('a');
        queue.enqueue('c');
        queue.enqueue('e');
        chai_1.expect(queue.size()).to.equal(3);
    });
    it('dequeues data', function () {
        chai_1.expect(queue.dequeue()).to.equal('a');
        chai_1.expect(queue.size()).to.equal(2);
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();
        chai_1.expect(queue.dequeue()).to.be.undefined;
        chai_1.expect(queue.size()).to.equal(0);
    });
    it('resets the queue', function () {
        queue.enqueue('a');
        queue.enqueue('c');
        queue.enqueue('e');
        chai_1.expect(queue.size()).to.equal(3);
        queue.reset();
        chai_1.expect(queue.size()).to.equal(0);
    });
    it('enqueues and dequeues functions', function () {
        function addOne(x) {
            return x + 1;
        }
        function addn(n, x) {
            return x + n;
        }
        queue.reset();
        queue.enqueue(addOne);
        queue.enqueue(addn);
        queue.enqueue(addOne(4));
        queue.enqueue(addn.bind(null, 3));
        chai_1.expect(queue.dequeue()(3)).to.equal(4);
        chai_1.expect(queue.dequeue()(5, 7)).to.equal(12);
        chai_1.expect(queue.dequeue()).to.equal(5);
        chai_1.expect(queue.dequeue()(4)).to.equal(7);
        chai_1.expect(queue.size()).to.equal(0);
    });
});
//# sourceMappingURL=queue.test.js.map
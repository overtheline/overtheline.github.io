"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var distance_1 = require("../distance");
describe('distance', function () {
    var distanceFn = distance_1.default(10, 7);
    it('return a positive number that is the taxicab distance of two points', function () {
        chai_1.expect(distanceFn(0, 0, 3, 4)).to.equal(7);
        chai_1.expect(distanceFn(4, 2, 15, 10)).to.equal(2);
        chai_1.expect(distanceFn(-5, -3, 27, -20)).to.equal(5);
    });
    it('returns zero if two points have no distance between them', function () {
        chai_1.expect(distanceFn(0, 0, 0, 0)).to.equal(0);
        chai_1.expect(distanceFn(2, 3, 12, 10)).to.equal(0);
        chai_1.expect(distanceFn(2, 3, -8, -4)).to.equal(0);
    });
});
//# sourceMappingURL=distance.test.js.map
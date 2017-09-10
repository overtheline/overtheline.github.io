"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var torus_scale_1 = require("../torus-scale");
describe('torusScale', function () {
    var scaleFn = torus_scale_1.default(5);
    it('returns a regular number', function () {
        chai_1.expect(scaleFn(3)).to.equal(3);
        chai_1.expect(scaleFn(0)).to.equal(0);
    });
    it('returns a modulo number', function () {
        chai_1.expect(scaleFn(9)).to.equal(4);
        chai_1.expect(scaleFn(5)).to.equal(0);
        chai_1.expect(scaleFn(-3)).to.equal(2);
        chai_1.expect(scaleFn(47)).to.equal(2);
        chai_1.expect(scaleFn(-16)).to.equal(4);
    });
});
//# sourceMappingURL=torus-scale.test.js.map
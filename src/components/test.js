"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = (function () {
    function Test(_a) {
        var foo = _a.foo, bar = _a.bar, baz = _a.baz;
        this.foo = foo;
        this.bar = bar;
        this.baz = baz;
    }
    Test.prototype.binOp = function (x, y) {
        return this.bar(x, y);
    };
    Test.prototype.sayStr = function (inputStr) {
        return this.baz(this.foo, inputStr);
    };
    return Test;
}());
exports.default = Test;
//# sourceMappingURL=test.js.map
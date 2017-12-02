"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_selection_1 = require("d3-selection");
var test_1 = require("./components/test");
var check_box_1 = require("./components/check-box");
function add(x, y) {
    return x + y;
}
function sayThing(greeting, name) {
    return greeting + " " + name + ".";
}
var props = {
    foo: 'Hello',
    bar: add,
    baz: sayThing,
};
var test = new test_1.default(props);
var d3ContentDiv = d3_selection_1.select('#content').append('div');
d3ContentDiv.text(test.sayStr('Jimbob'));
var checkbox = new check_box_1.default({
    target: d3ContentDiv,
    evtHandler: function (d, i, n) {
        console.log(this, d, i, n);
    }
});
checkbox.render();
//# sourceMappingURL=index.js.map
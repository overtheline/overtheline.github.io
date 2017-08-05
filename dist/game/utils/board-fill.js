"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("../constants/colors");
function checkerFill(i, j) {
    return (i + j) % 2 === 0 ? colors_1.black : colors_1.red;
}
exports.default = checkerFill;
//# sourceMappingURL=board-fill.js.map
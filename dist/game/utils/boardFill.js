"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boardColors_1 = require("../constants/boardColors");
function boardFill(i, j) {
    return (i + j) % 2 === 0 ? boardColors_1.black : boardColors_1.red;
}
exports.default = boardFill;
//# sourceMappingURL=boardFill.js.map
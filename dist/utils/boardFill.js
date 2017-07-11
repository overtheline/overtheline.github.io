"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var red = 'rgba(255, 0, 0, 0.1)';
var black = 'rgba(0, 0, 0, 0.1)';
function boardFill(i, j) {
    return (i + j) % 2 === 0 ? black : red;
}
exports.default = boardFill;
//# sourceMappingURL=boardFill.js.map
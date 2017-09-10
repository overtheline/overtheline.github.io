"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var torus_scale_1 = require("./torus-scale");
function default_1(modX, modY) {
    var modXScale = torus_scale_1.default(modX);
    var modYScale = torus_scale_1.default(modY);
    return function modDistance(x1, y1, x2, y2) {
        return Math.abs(modXScale(x1) - modXScale(x2)) + Math.abs(modYScale(y1) - modYScale(y2));
    };
}
exports.default = default_1;
//# sourceMappingURL=distance.js.map
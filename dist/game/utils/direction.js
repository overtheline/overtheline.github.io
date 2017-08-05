"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dir = require("../constants/directions");
function getDirection(nextDirection, prevDirection) {
    if ((nextDirection === dir.DOWN && prevDirection !== dir.UP)
        || (nextDirection === dir.UP && prevDirection !== dir.DOWN)
        || (nextDirection === dir.LEFT && prevDirection !== dir.RIGHT)
        || (nextDirection === dir.RIGHT && prevDirection !== dir.LEFT)) {
        return { direction: nextDirection };
    }
    return { direction: prevDirection };
}
exports.default = getDirection;
//# sourceMappingURL=direction.js.map
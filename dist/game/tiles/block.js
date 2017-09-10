"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_tile_1 = require("./base-tile");
var fill = require("../constants/colors");
function getBlockTile(x, y) {
    return new base_tile_1.default(x, y, fill.blockEnter, fill.blockUpdate, fill.blockExit);
}
exports.default = getBlockTile;
//# sourceMappingURL=block.js.map
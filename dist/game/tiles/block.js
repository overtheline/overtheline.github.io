"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var fill = require("../constants/colors");
function getBlockTile(x, y) {
    return new Tile_1.default(x, y, fill.blockEnter, fill.blockUpdate, fill.blockExit);
}
exports.default = getBlockTile;
//# sourceMappingURL=block.js.map
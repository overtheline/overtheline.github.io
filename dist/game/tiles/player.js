"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_tile_1 = require("./base-tile");
var fill = require("../constants/colors");
function getPlayerTile(x, y) {
    return new base_tile_1.default(x, y, fill.playerEnter, fill.playerUpdate, fill.playerExit);
}
exports.default = getPlayerTile;
//# sourceMappingURL=player.js.map
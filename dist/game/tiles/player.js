"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var fill = require("../constants/colors");
function getPlayerTile(x, y) {
    return new Tile_1.default(x, y, fill.playerEnter, fill.playerUpdate, fill.playerExit);
}
exports.default = getPlayerTile;
//# sourceMappingURL=player.js.map
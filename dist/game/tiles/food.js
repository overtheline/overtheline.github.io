"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var fill = require("../constants/colors");
function getFoodTile(x, y) {
    return new Tile_1.default(x, y, fill.foodEnter, fill.foodUpdate, fill.foodExit);
}
exports.default = getFoodTile;
//# sourceMappingURL=food.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_tile_1 = require("./base-tile");
var fill = require("../constants/colors");
function getFoodTile(x, y) {
    return new base_tile_1.default(x, y, fill.foodEnter, fill.foodUpdate, fill.foodExit);
}
exports.default = getFoodTile;
//# sourceMappingURL=food.js.map
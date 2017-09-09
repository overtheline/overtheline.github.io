"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var fill = require("../constants/colors");
var Food = (function () {
    function Food() {
    }
    Food.prototype.getTiles = function () {
        return this.tiles;
    };
    Food.prototype.addFood = function (x, y) {
        this.tiles = [
            new Tile_1.default({
                x: x,
                y: y,
                enterColor: fill.foodEnter,
                updateColor: fill.foodUpdate,
                exitColor: fill.foodExit,
            }),
        ];
    };
    return Food;
}());
exports.default = Food;
//# sourceMappingURL=food.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var fill = require("../constants/colors");
var Food = (function (_super) {
    __extends(Food, _super);
    function Food(x, y) {
        return _super.call(this, x, y, fill.foodEnter, fill.foodUpdate, fill.foodExit) || this;
    }
    return Food;
}(Tile_1.default));
exports.default = Food;
//# sourceMappingURL=food.js.map
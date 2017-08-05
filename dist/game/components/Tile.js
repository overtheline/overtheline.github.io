"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var Tile = (function () {
    function Tile(config) {
        this.x = config.x;
        this.y = config.y;
        this.willEnterColor = config.willEnterColor;
        this.didEnterColor = config.didEnterColor;
        this.updateColor = config.updateColor;
        this.willExitColor = config.willExitColor;
        this.didExitColor = config.didExitColor;
    }
    return Tile;
}());
exports.default = Tile;
//# sourceMappingURL=Tile.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var directions_1 = require("../constants/directions");
var fill = require("../constants/colors");
var Player = (function () {
    function Player(x, y) {
        this.currentDirection = directions_1.RIGHT;
        this.tiles = [];
        for (var i = 0; i < 15; i++) {
            this.tiles.push(new Tile_1.default({
                x: x,
                y: y,
                enterColor: fill.playerEnter,
                updateColor: fill.playerUpdate,
                exitColor: fill.playerExit,
            }));
        }
    }
    Player.prototype.getTiles = function () {
        return this.tiles;
    };
    Player.prototype.updatePosition = function (nextDirection) {
        var head = this.tiles[0];
        // Do not back up on yourself
        if ((nextDirection === directions_1.UP && this.currentDirection !== directions_1.DOWN)
            || (nextDirection === directions_1.DOWN && this.currentDirection !== directions_1.UP)
            || (nextDirection === directions_1.RIGHT && this.currentDirection !== directions_1.LEFT)
            || (nextDirection === directions_1.LEFT && this.currentDirection !== directions_1.RIGHT)) {
            this.currentDirection = nextDirection;
        }
        for (var i = this.tiles.length - 1; i > 0; i--) {
            this.tiles[i].x = this.tiles[i - 1].x;
            this.tiles[i].y = this.tiles[i - 1].y;
        }
        switch (this.currentDirection) {
            case directions_1.UP:
                head.y -= 1;
                break;
            case directions_1.DOWN:
                head.y += 1;
                break;
            case directions_1.LEFT:
                head.x -= 1;
                break;
            case directions_1.RIGHT:
                head.x += 1;
                break;
        }
    };
    return Player;
}());
exports.default = Player;
//# sourceMappingURL=player.js.map
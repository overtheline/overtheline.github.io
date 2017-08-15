"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = require("./Tile");
var directions_1 = require("../constants/directions");
var status = require("../constants/tile-status");
var fill = require("../constants/colors");
var Player = (function () {
    function Player() {
        this.currentDirection = directions_1.RIGHT;
        this.tiles = [];
        this.status = status.WILL_SPAWN;
    }
    Player.prototype.spawn = function (x, y) {
        var tiles = [];
        for (var i = 0; i < 15; i++) {
            tiles.push(new Tile_1.default({
                x: x,
                y: y,
                enterColor: fill.playerEnter,
                updateColor: fill.playerUpdate,
                exitColor: fill.playerExit,
            }));
        }
        this.status = status.DID_SPAWN;
        return tiles;
    };
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
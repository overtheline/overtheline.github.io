"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directions_1 = require("../constants/directions");
var Player = (function () {
    function Player(playerTiles) {
        this.playerTiles = playerTiles;
        this.currentDirection = directions_1.RIGHT;
    }
    Player.prototype.updatePosition = function (nextDirection) {
        if ((nextDirection === directions_1.UP && this.currentDirection !== directions_1.DOWN)
            || (nextDirection === directions_1.DOWN && this.currentDirection !== directions_1.UP)
            || (nextDirection === directions_1.RIGHT && this.currentDirection !== directions_1.LEFT)
            || (nextDirection === directions_1.LEFT && this.currentDirection !== directions_1.RIGHT)) {
            this.currentDirection = nextDirection;
        }
        for (var i = this.playerTiles.length - 1; i > 0; i--) {
            this.playerTiles[i].x = this.playerTiles[i - 1].x;
            this.playerTiles[i].y = this.playerTiles[i - 1].y;
        }
        switch (this.currentDirection) {
            case directions_1.UP:
                this.playerTiles[0].y -= 1;
                break;
            case directions_1.DOWN:
                this.playerTiles[0].y += 1;
                break;
            case directions_1.LEFT:
                this.playerTiles[0].x -= 1;
                break;
            case directions_1.RIGHT:
                this.playerTiles[0].x += 1;
                break;
        }
    };
    return Player;
}());
exports.default = Player;
//# sourceMappingURL=Player.js.map
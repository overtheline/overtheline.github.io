"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var player_1 = require("./components/player");
var board_1 = require("./components/board");
var directions_1 = require("./constants/directions");
var direction_1 = require("./utils/direction");
var loop_1 = require("./utils/loop");
var Game = (function () {
    function Game(config) {
        this.pxWidth = config.pxWidth;
        this.pxHeight = config.pxHeight;
        this.tileWidth = config.tileWidth;
        this.tileHeight = config.tileHeight;
        // Initial game state
        this.gameState = {
            frame: 0,
            direction: directions_1.RIGHT,
            playerAlive: false,
            readyToPlay: false,
        };
        // bindings
        this.handleKeydown = this.handleKeydown.bind(this);
        this.updateGameState = this.updateGameState.bind(this);
    }
    Game.prototype.updateGameState = function (partialState) {
        this.gameState = Object.assign({}, this.gameState, partialState);
    };
    Game.prototype.frameFunction = function (n) {
        console.log(n);
    };
    Game.prototype.init = function () {
        console.log('game init');
        this.board = new board_1.default(this.tileWidth, this.tileHeight, this.pxWidth, this.pxHeight);
        this.player = new player_1.default();
        d3.select('body').on('keydown', this.handleKeydown);
        this.board.createBoardTiles();
        this.board.drawBoard();
        this.loop = new loop_1.default(this.frameFunction);
    };
    Game.prototype.handleKeydown = function () {
        console.log(d3.event.keyCode);
        var _a = this.gameState, direction = _a.direction, playerAlive = _a.playerAlive, readyToPlay = _a.readyToPlay;
        var _b = this, loop = _b.loop, updateGameState = _b.updateGameState;
        switch (d3.event.keyCode) {
            case 32:
                // SPACE
                if (readyToPlay && !playerAlive) {
                    updateGameState({ playerAlive: true });
                    loop.start();
                }
                break;
            case 38:
                // UP
                updateGameState(direction_1.default(directions_1.UP, direction));
                break;
            case 40:
                // DOWN
                updateGameState(direction_1.default(directions_1.DOWN, direction));
                break;
            case 37:
                // LEFT
                updateGameState(direction_1.default(directions_1.LEFT, direction));
                break;
            case 39:
                // RIGHT
                updateGameState(direction_1.default(directions_1.RIGHT, direction));
                break;
            // a
            case 65:
                if (!playerAlive) {
                    updateGameState({ playerAlive: true });
                    loop.start();
                }
                break;
            // s
            case 83:
                if (playerAlive) {
                    updateGameState({ playerAlive: false });
                    loop.stop();
                }
                break;
            default:
                updateGameState({});
                break;
        }
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=index.js.map
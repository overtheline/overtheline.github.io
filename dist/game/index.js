"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var board_1 = require("./components/board");
var directions_1 = require("./constants/directions");
var direction_1 = require("./utils/direction");
var loop_1 = require("./utils/loop");
var distance_1 = require("./utils/distance");
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
            readyToUpdate: true,
        };
        // bindings
        this.handleKeydown = this.handleKeydown.bind(this);
        this.updateGameState = this.updateGameState.bind(this);
        this.frameFunction = this.frameFunction.bind(this);
        this.lastTime = 0;
        this.targetMS = 40;
        this.boardDistance = distance_1.default(this.tileWidth, this.tileHeight);
    }
    Game.prototype.updateGameState = function (partialState) {
        this.gameState = Object.assign({}, this.gameState, partialState);
    };
    Game.prototype.frameFunction = function (elapsed) {
        var _this = this;
        if (elapsed - this.lastTime >= this.targetMS && this.gameState.readyToUpdate) {
            this.updateGameState({ readyToUpdate: false });
            this.board.movePlayer(this.gameState.direction);
            this.board.renderFoodTiles(function () { });
            this.board.renderPlayerTiles(function () { _this.updateGameState({ readyToUpdate: true }); });
            this.lastTime = elapsed;
            console.log(this.board.playerTiles[0].x, this.board.playerTiles[0].y);
            console.log(this.boardDistance(this.board.playerTiles[0].x, this.board.playerTiles[0].y, this.board.foodTiles[0].x, this.board.foodTiles[0].y));
            if (this.boardDistance(this.board.playerTiles[0].x, this.board.playerTiles[0].y, this.board.foodTiles[0].x, this.board.foodTiles[0].y) === 0) {
                console.log('bang');
            }
        }
    };
    Game.prototype.init = function () {
        var _this = this;
        console.log('game init');
        this.board = new board_1.default(this.tileWidth, this.tileHeight, this.pxWidth, this.pxHeight);
        d3.select('body').on('keydown', this.handleKeydown);
        // setup
        this.board.createBoard();
        this.board.createPlayer(2, 3);
        this.board.createFood(20, 20);
        this.board.renderBoard(function () { return _this.updateGameState({ readyToPlay: true }); });
        this.loop = new loop_1.default(this.frameFunction);
    };
    Game.prototype.handleKeydown = function () {
        console.log(d3.event.keyCode);
        var _a = this.gameState, direction = _a.direction, playerAlive = _a.playerAlive, readyToPlay = _a.readyToPlay;
        var updateGameState = this.updateGameState;
        switch (d3.event.keyCode) {
            case 32:
                // SPACE
                if (readyToPlay && !playerAlive) {
                    updateGameState({ playerAlive: true });
                    this.loop.start();
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
                if (readyToPlay && !playerAlive) {
                    updateGameState({ playerAlive: true });
                    this.loop.start();
                }
                break;
            // s
            case 83:
                if (readyToPlay && playerAlive) {
                    updateGameState({ playerAlive: false });
                    this.lastTime = 0;
                    this.loop.stop();
                }
                break;
            default:
                return;
        }
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=index.js.map
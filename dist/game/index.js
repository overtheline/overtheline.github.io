"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var Player_1 = require("./Player");
var tile_1 = require("../components/tile");
var directions_1 = require("../constants/directions");
var boardFill_1 = require("../utils/boardFill");
var Game = (function () {
    function Game(config) {
        this.boardSVG = d3.select('#svg-layer-0');
        this.gameSVG = d3.select('#svg-layer-1');
        this.pxWidth = config.pxWidth;
        this.pxHeight = config.pxHeight;
        this.tileWidth = config.tileWidth;
        this.tileHeight = config.tileHeight;
        this.xScale = d3.scaleLinear()
            .domain([0, this.tileWidth]).range([0, this.pxWidth]);
        this.yScale = d3.scaleLinear()
            .domain([0, this.tileHeight]).range([0, this.pxHeight]);
        // Initial game state
        this.gameState = {
            spinning: false,
            frames: 0,
            nextDirection: directions_1.RIGHT,
        };
        // bindings
        this.handleKeydown = this.handleKeydown.bind(this);
        this.mainLoop = this.mainLoop.bind(this);
        this.runGame = this.runGame.bind(this);
    }
    Game.prototype.init = function () {
        this.boardTiles = this.createBoardTiles();
        this.playerTiles = this.createPlayerTiles();
        this.player = new Player_1.default(this.playerTiles);
        this.drawBoard();
        d3.select('body').on('keydown', this.handleKeydown);
    };
    Game.prototype.createBoardTiles = function () {
        var tiles = [];
        for (var i = 0; i < this.tileWidth; i++) {
            for (var j = 0; j < this.tileHeight; j++) {
                tiles.push(new tile_1.default({
                    x: i,
                    y: j,
                    fill: boardFill_1.default(i, j),
                }));
            }
        }
        return tiles;
    };
    Game.prototype.createPlayerTiles = function () {
        var tiles = [];
        for (var i = 0; i < 10; i++) {
            tiles.push(new tile_1.default({
                x: Math.floor(this.tileWidth / 2),
                y: Math.floor(this.tileHeight / 2),
                fill: 'rgba(0, 255, 100, 0.6)',
            }));
        }
        return tiles;
    };
    Game.prototype.runGame = function () {
        if (this.gameState.spinning) {
            this.updateGameState({ spinning: false });
        }
        else {
            this.updateGameState({ spinning: true });
            this.mainLoop();
        }
    };
    Game.prototype.mainLoop = function () {
        this.player.updatePosition(this.gameState.nextDirection);
        this.checkCollisions();
        this.updateGameState({ frames: this.gameState.frames++ });
        this.drawGamePieces();
        if (this.gameState.spinning) {
            setTimeout(this.mainLoop, 50);
        }
    };
    Game.prototype.checkCollisions = function () {
        var playerHead = this.playerTiles[0];
        if (playerHead.x < 0 || playerHead.x > this.tileWidth
            || playerHead.y < 0 || playerHead.y > this.tileHeight) {
            this.playerTiles = [];
            this.updateGameState({ spinning: false });
        }
    };
    Game.prototype.updateGameState = function (partialState) {
        this.gameState = Object.assign({}, this.gameState, partialState);
    };
    Game.prototype.drawBoard = function () {
        var _this = this;
        this.boardSVG.selectAll('rect')
            .data(this.boardTiles)
            .enter().append('rect')
            .attr('width', this.xScale(1))
            .attr('height', this.yScale(1))
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('y', function (d) { return _this.yScale(d.y); })
            .attr('fill', function (d) { return d.fill; });
    };
    Game.prototype.drawGamePieces = function () {
        var _this = this;
        // JOIN
        var gamePieces = this.gameSVG.selectAll('rect')
            .data(this.playerTiles.slice());
        // EXIT
        gamePieces.exit()
            .attr('fill', 'rgba(255, 20, 100, 0.7)')
            .transition().duration(30)
            .attr('x', function (d) { return _this.xScale(d.x - 1); })
            .attr('y', function (d) { return _this.yScale(d.y - 1); })
            .attr('width', this.xScale(3))
            .attr('height', this.yScale(3))
            .attr('fill', 'rgba(255, 20, 100, 0)')
            .remove();
        // UPDATE
        gamePieces
            .transition().duration(30)
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('y', function (d) { return _this.yScale(d.y); });
        // ENTER
        gamePieces
            .enter().append('rect')
            .attr('x', function (d) { return _this.xScale(d.x - 1); })
            .attr('y', function (d) { return _this.yScale(d.y - 1); })
            .attr('width', this.xScale(3))
            .attr('height', this.yScale(3))
            .transition().duration(30)
            .attr('width', this.xScale(1))
            .attr('height', this.yScale(1))
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('y', function (d) { return _this.yScale(d.y); })
            .attr('fill', function (d) { return d.fill; });
    };
    Game.prototype.handleKeydown = function () {
        switch (d3.event.keyCode) {
            case 32:
                // SPACE
                this.runGame();
                break;
            case 38:
                // UP
                this.updateGameState({ nextDirection: directions_1.UP });
                break;
            case 40:
                // DOWN
                this.updateGameState({ nextDirection: directions_1.DOWN });
                break;
            case 37:
                // LEFT
                this.updateGameState({ nextDirection: directions_1.LEFT });
                break;
            case 39:
                // RIGHT
                this.updateGameState({ nextDirection: directions_1.RIGHT });
                break;
            default:
                this.updateGameState({});
                break;
        }
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=index.js.map
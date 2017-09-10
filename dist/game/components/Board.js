"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var base_tile_1 = require("../tiles/base-tile");
var player_1 = require("../tiles/player");
var food_1 = require("../tiles/food");
var block_1 = require("../tiles/block");
var checker_fill_1 = require("../utils/checker-fill");
var torus_scale_1 = require("../utils/torus-scale");
var directions_1 = require("../constants/directions");
var fill = require("../constants/colors");
var Board = (function () {
    function Board(tileWidth, tileHeight, pxWidth, pxHeight) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.pxWidth = pxWidth;
        this.pxHeight = pxHeight;
        this.boardSVG = d3.select('#svg-layer-0');
        this.gameSVG = d3.select('#svg-layer-1');
        this.xScale = d3.scaleLinear()
            .domain([0, this.tileWidth])
            .range([0, this.pxWidth]);
        this.yScale = d3.scaleLinear()
            .domain([0, this.tileHeight])
            .range([0, this.pxHeight]);
    }
    // BOARD METHODS
    Board.prototype.createBoard = function () {
        var boardTiles = [];
        for (var i = 0; i < this.tileWidth; i++) {
            for (var j = 0; j < this.tileHeight; j++) {
                boardTiles.push(new base_tile_1.default(i, j, checker_fill_1.default(i, j, fill.clear, fill.clear), checker_fill_1.default(i, j, fill.red, fill.black), checker_fill_1.default(i, j, fill.clear, fill.clear)));
            }
        }
        this.boardTiles = boardTiles;
    };
    Board.prototype.destroyBoardTiles = function () {
        this.boardTiles = [];
    };
    // PLAYER METHODS
    Board.prototype.createPlayer = function (x, y) {
        this.playerTiles = [];
        for (var i = 0; i < 25; i++) {
            this.addPlayerTile(x, y);
        }
    };
    Board.prototype.addPlayerTile = function (x, y) {
        if (this.playerTiles.length) {
            var lastTile = this.playerTiles[this.playerTiles.length - 1];
            this.playerTiles.push(player_1.default(lastTile.x, lastTile.y));
        }
        else if (x && y) {
            this.playerTiles.push(player_1.default(x, y));
        }
    };
    Board.prototype.movePlayer = function (nextPlayerDirection) {
        var head = this.playerTiles[0];
        for (var i = this.playerTiles.length - 1; i > 0; i--) {
            this.playerTiles[i].x = this.playerTiles[i - 1].x;
            this.playerTiles[i].y = this.playerTiles[i - 1].y;
        }
        switch (nextPlayerDirection) {
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
    Board.prototype.destroyPlayer = function () {
        this.playerTiles = [];
    };
    // FOOD METHODS
    Board.prototype.createFood = function (x, y) {
        this.foodTiles = [];
        this.addFoodTile(x, y);
    };
    Board.prototype.addFoodTile = function (x, y) {
        this.foodTiles.push(food_1.default(x, y));
    };
    Board.prototype.removeFoodTile = function (removeObj) {
        this.foodTiles = this.foodTiles.filter(function (foodObj) { return foodObj !== removeObj; });
    };
    Board.prototype.destroyFood = function () {
        this.foodTiles = [];
    };
    // BLOCK METHODS
    Board.prototype.addBlockTile = function (x, y) {
        this.blockTiles.push(block_1.default(x, y));
    };
    Board.prototype.removeBlockTile = function (removeObj) {
        this.blockTiles = this.blockTiles.filter(function (blockObj) { return blockObj !== removeObj; });
    };
    Board.prototype.destroyBlocks = function () {
        this.blockTiles = [];
    };
    // RENDER METHODS
    Board.prototype.renderBoard = function (cb) {
        var _this = this;
        var tiles = this.boardSVG.selectAll('rect')
            .data(this.boardTiles);
        tiles
            .enter().append('rect')
            .attr('width', this.xScale(1))
            .attr('height', this.yScale(1))
            .attr('x', this.xScale(this.tileWidth / 2))
            .attr('y', this.yScale(this.tileHeight / 2))
            .attr('fill', function (d) { return d.enterColor; })
            .transition().duration(1000).ease(d3.easeBounceOut)
            .attr('y', function (d) { return _this.yScale(d.y); })
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('fill', function (d) { return d.updateColor; })
            .on('end', cb);
        tiles
            .exit()
            .attr('fill', function (d) { return d.exitColor; })
            .transition().duration(500)
            .attr('x', function (d) { return _this.xScale(d.x - 0.5); })
            .attr('y', function (d) { return _this.yScale(d.y - 0.5); })
            .attr('width', this.xScale(0))
            .attr('height', this.yScale(0))
            .attr('fill', fill.clear);
    };
    Board.prototype.renderPlayerTiles = function (cb) {
        this.renderGameTiles(this.playerTiles, 'player-tile', cb);
    };
    Board.prototype.renderFoodTiles = function (cb) {
        this.renderGameTiles(this.foodTiles, 'food-tile', cb);
    };
    Board.prototype.renderBlockTile = function (cb) {
        this.renderGameTiles(this.blockTiles, 'block-tile', cb);
    };
    Board.prototype.renderGameTiles = function (tiles, targetClass, cb) {
        var _this = this;
        // JOIN
        var gamePieces = this.gameSVG.selectAll("." + targetClass).data(tiles);
        // EXIT
        gamePieces.exit()
            .attr('fill', function (d) { return d.exitColor; })
            .transition().duration(100)
            .attr('x', function (d) { return _this.xScale(d.x + 0.5); })
            .attr('y', function (d) { return _this.yScale(d.y + 0.5); })
            .attr('width', this.xScale(0))
            .attr('height', this.yScale(0))
            .attr('fill', function (d) { return fill.clear; })
            .remove()
            .on('end', cb);
        // ENTER
        gamePieces
            .enter().append('rect')
            .classed(targetClass, true)
            .attr('x', function (d) { return _this.xScale(d.x - 1); })
            .attr('y', function (d) { return _this.yScale(d.y - 1); })
            .attr('width', this.xScale(3))
            .attr('height', this.yScale(3))
            .attr('fill', function (d) { return d.enterColor; })
            .transition().duration(100)
            .attr('width', this.xScale(1))
            .attr('height', this.yScale(1))
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('y', function (d) { return _this.yScale(d.y); })
            .attr('fill', function (d) { return d.updateColor; })
            .on('end', cb);
        // UPDATE
        gamePieces
            .attr('x', function (d) { return _this.xScale(torus_scale_1.default(_this.tileWidth)(d.x)); })
            .attr('y', function (d) { return _this.yScale(torus_scale_1.default(_this.tileHeight)(d.y)); })
            .call(cb);
    };
    return Board;
}());
exports.default = Board;
//# sourceMappingURL=board.js.map
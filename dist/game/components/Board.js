"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var Tile_1 = require("./Tile");
var checker_fill_1 = require("../utils/checker-fill");
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
    Board.prototype.createBoardTiles = function () {
        var tiles = [];
        for (var i = 0; i < this.tileWidth; i++) {
            for (var j = 0; j < this.tileHeight; j++) {
                tiles.push(new Tile_1.default({
                    x: i,
                    y: j,
                    willEnterColor: fill.clear,
                    didEnterColor: checker_fill_1.default(i, j),
                    updateColor: checker_fill_1.default(i, j),
                    willExitColor: checker_fill_1.default(i, j),
                    didExitColor: fill.clear,
                }));
            }
        }
        this.tiles = tiles;
    };
    Board.prototype.drawBoard = function () {
        var _this = this;
        var boardTiles = this.boardSVG.selectAll('rect')
            .data(this.tiles);
        boardTiles
            .enter().append('rect')
            .attr('width', this.xScale(1))
            .attr('height', this.yScale(1))
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('y', function (d) { return _this.yScale(d.y); })
            .attr('fill', function (d) { return d.updateColor; });
    };
    Board.prototype.drawGamePieces = function (tiles, onRenderEnd) {
        var _this = this;
        // JOIN
        var gamePieces = this.gameSVG.selectAll('rect')
            .data(tiles);
        // EXIT
        gamePieces.exit()
            .attr('fill', function (d) { return d.willExitColor; })
            .transition().duration(500)
            .attr('x', function (d) { return _this.xScale(d.x + 0.5); })
            .attr('y', function (d) { return _this.yScale(d.y + 0.5); })
            .attr('width', this.xScale(0))
            .attr('height', this.yScale(0))
            .attr('fill', function (d) { return d.didExitColor; })
            .remove()
            .call(onRenderEnd);
        // UPDATE
        gamePieces
            .transition().duration(30)
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('y', function (d) { return _this.yScale(d.y); })
            .attr('fill', function (d) { return d.updateColor; })
            .call(onRenderEnd);
        // ENTER
        gamePieces
            .enter().append('rect')
            .attr('x', function (d) { return _this.xScale(d.x - 1); })
            .attr('y', function (d) { return _this.yScale(d.y - 1); })
            .attr('width', this.xScale(3))
            .attr('height', this.yScale(3))
            .attr('fill', function (d) { return d.willEnterColor; })
            .transition().duration(30)
            .attr('width', this.xScale(1))
            .attr('height', this.yScale(1))
            .attr('x', function (d) { return _this.xScale(d.x); })
            .attr('y', function (d) { return _this.yScale(d.y); })
            .attr('fill', function (d) { return d.didEnterColor; })
            .call(onRenderEnd);
    };
    return Board;
}());
exports.default = Board;
//# sourceMappingURL=Board.js.map
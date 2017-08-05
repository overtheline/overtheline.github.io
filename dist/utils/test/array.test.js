"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Tile_1 = require("../../game/Tile");
var array_1 = require("../array");
var mockObjectConfigs = [
    { x: 1, y: 2, fill: 'black' },
    { x: 3, y: 4, fill: 'red' },
    { x: 5, y: 6, fill: 'blue' },
];
describe('array', function () {
    var objects = mockObjectConfigs.map(function (config) { return new Tile_1.default(config); });
    it('returns false if no collision', function () {
        var test = new Tile_1.default({ x: 3, y: 3, fill: 'black' });
        chai_1.expect(array_1.collision(test, objects)).to.be.false;
    });
    it('returns true if there is a collision', function () {
        var test = new Tile_1.default(mockObjectConfigs[1]);
        chai_1.expect(array_1.collision(test, objects)).to.be.true;
    });
});
//# sourceMappingURL=array.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var fill = require("../../constants/colors");
var player_1 = require("../player");
var food_1 = require("../food");
describe('Player', function () {
    var player = player_1.default(2, 3);
    it('has x and y coordinates', function () {
        chai_1.expect(player.x).to.equal(2);
        chai_1.expect(player.y).to.equal(3);
    });
    it('has the player colors', function () {
        chai_1.expect(player.enterColor).to.equal(fill.playerEnter);
        chai_1.expect(player.updateColor).to.equal(fill.playerUpdate);
        chai_1.expect(player.exitColor).to.equal(fill.playerExit);
    });
});
describe('Food', function () {
    var food = food_1.default(2, 3);
    it('has x and y coordinates', function () {
        chai_1.expect(food.x).to.equal(2);
        chai_1.expect(food.y).to.equal(3);
    });
    it('has the food colors', function () {
        chai_1.expect(food.enterColor).to.equal(fill.foodEnter);
        chai_1.expect(food.updateColor).to.equal(fill.foodUpdate);
        chai_1.expect(food.exitColor).to.equal(fill.foodExit);
    });
});
//# sourceMappingURL=tiles.test.js.map
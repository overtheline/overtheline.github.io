import { expect } from 'chai';

import * as fill from '../../constants/colors';
import Tile from '../tile';
import getPlayerTile from '../player';
import getFoodTile from '../food';

describe('Player', function() {
  const player: Tile = getPlayerTile(2, 3);

  it('has x and y coordinates', function() {
    expect(player.x).to.equal(2);
    expect(player.y).to.equal(3);
  });

  it('has the player colors', function() {
    expect(player.enterColor).to.equal(fill.playerEnter);
    expect(player.updateColor).to.equal(fill.playerUpdate);
    expect(player.exitColor).to.equal(fill.playerExit);
  });
});

describe('Food', function() {
  const food: Tile = getFoodTile(2, 3);

  it('has x and y coordinates', function() {
    expect(food.x).to.equal(2);
    expect(food.y).to.equal(3);
  });

  it('has the food colors', function() {
    expect(food.enterColor).to.equal(fill.foodEnter);
    expect(food.updateColor).to.equal(fill.foodUpdate);
    expect(food.exitColor).to.equal(fill.foodExit);
  });
});

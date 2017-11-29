import { expect } from 'chai';

import distance from '../distance';

describe('distance', function() {
  const distanceFn = distance(10, 7);

  it('return a positive number that is the taxicab distance of two points', function() {
    expect(distanceFn(0, 0, 3, 4)).to.equal(7);
    expect(distanceFn(4, 2, 15, 10)).to.equal(2);
    expect(distanceFn(-5, -3, 27, -20)).to.equal(5);
  });

  it('returns zero if two points have no distance between them', function() {
    expect(distanceFn(0, 0, 0, 0)).to.equal(0);
    expect(distanceFn(2, 3, 12, 10)).to.equal(0);
    expect(distanceFn(2, 3, -8, -4)).to.equal(0);
  });
});

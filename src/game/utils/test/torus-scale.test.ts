import { expect } from 'chai';

import torusScale from '../torus-scale';

describe('torusScale', function() {
  const scaleFn = torusScale(5);

  it('returns a regular number', function() {
    expect(scaleFn(3)).to.equal(3);
    expect(scaleFn(0)).to.equal(0);
  });

  it('returns a modulo number', function() {
    expect(scaleFn(9)).to.equal(4);
    expect(scaleFn(5)).to.equal(0);
    expect(scaleFn(-3)).to.equal(2);
    expect(scaleFn(47)).to.equal(2);
    expect(scaleFn(-16)).to.equal(4);
  });
});

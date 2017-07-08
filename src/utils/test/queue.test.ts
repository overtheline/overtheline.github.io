import { expect } from 'chai';

import Queue from '../queue';

describe('Queue', () => {
  const queue = new Queue();


  it('returns the size of the queue', () => {
    expect(queue.size()).to.equal(0);
  });

  it('enqueues data', () => {
    queue.enqueue('a');
    queue.enqueue('c');
    queue.enqueue('e');

    expect(queue.size()).to.equal(3);
  });

  it('dequeues data', () => {
    expect(queue.dequeue()).to.equal('a');
    expect(queue.size()).to.equal(2);

    queue.dequeue()
    queue.dequeue()
    queue.dequeue()
    queue.dequeue()
    expect(queue.dequeue()).to.be.undefined;
    expect(queue.size()).to.equal(0);
  });
});

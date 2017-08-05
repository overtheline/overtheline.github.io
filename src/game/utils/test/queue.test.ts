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

  it('resets the queue', () => {
    queue.enqueue('a');
    queue.enqueue('c');
    queue.enqueue('e');

    expect(queue.size()).to.equal(3);
    queue.reset();
    expect(queue.size()).to.equal(0);
  });

  it('enqueues and dequeues functions', () => {
    function addOne(x: number) {
      return x + 1;
    }

    function addn(n: number, x: number) {
      return x + n;
    }

    queue.reset();

    queue.enqueue(addOne);
    queue.enqueue(addn);
    queue.enqueue(addOne(4));
    queue.enqueue(addn.bind(null, 3));

    expect(queue.dequeue()(3)).to.equal(4);
    expect(queue.dequeue()(5, 7)).to.equal(12);
    expect(queue.dequeue()).to.equal(5);
    expect(queue.dequeue()(4)).to.equal(7);
    expect(queue.size()).to.equal(0);
  });
});

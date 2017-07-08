export default class Queue {
  private headIndex: number;
  private tailIndex: number;
  private storage: { [index: number]: any};

  constructor() {
    this.headIndex = 1;
    this.tailIndex = 1;
    this.storage = {};
  }

  size() {
    return this.tailIndex - this.headIndex;
  }

  enqueue(data: any) {
    this.storage[this.tailIndex] = data;
    this.tailIndex++;
  }

  dequeue(): any {
    if (this.tailIndex !== this.headIndex) {
      const output = this.storage[this.headIndex];
      delete this.storage[this.headIndex];
      this.headIndex++;

      return output;
    }
  }
}

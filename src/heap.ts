// formulas (using array representation of a complete binary tree):
//  - current node: index
//  - parent: Math.floor((index - 1) / 2)
//  - left child: index * 2 + 1
//  - right child: index * 2 + 2

class MinHeap<T extends { priority: number }> {
  private tree: T[] = [];

  constructor(...values: T[]);
  constructor(values?: T[]);
  constructor(...values: T[]) {
    if (Array.isArray(values[0])) {
      values = values[0];
    }

    values.forEach((value) => this.push(value));
  }

  public push(value: T) {
    const index = this.tree.push(value) - 1;

    this.siftUp(index);

    return index + 1;
  }

  public pop() {
    const lastIndex = this.length - 1;

    // swap first with last
    [this.tree[0], this.tree[lastIndex]] = [this.tree[lastIndex], this.tree[0]];

    const value = this.tree.pop();

    this.siftDown(0);

    return value;
  }

  public peek(): Readonly<T> {
    return this.tree[0];
  }

  public get length() {
    return this.tree.length;
  }

  private siftUp(index: number) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex < 0) {
      return;
    }

    if (this.tree[parentIndex].priority > this.tree[index].priority) {
      // swap parent with child
      [this.tree[parentIndex], this.tree[index]] = [
        this.tree[index],
        this.tree[parentIndex],
      ];

      this.siftUp(parentIndex);
    }
  }

  private siftDown(index: number) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    const lastIndex = this.length - 1;

    if (lastIndex < 0) {
      return;
    }

    let minChildIndex: number | undefined;

    if (rightChildIndex <= lastIndex && leftChildIndex <= lastIndex) {
      minChildIndex =
        rightChildIndex < leftChildIndex ? rightChildIndex : leftChildIndex;
    } else if (rightChildIndex <= lastIndex) {
      minChildIndex = rightChildIndex;
    } else if (leftChildIndex <= lastIndex) {
      minChildIndex = leftChildIndex;
    }

    if (
      minChildIndex &&
      this.tree[minChildIndex].priority < this.tree[index].priority
    ) {
      // swap child with parent
      [this.tree[minChildIndex], this.tree[index]] = [
        this.tree[index],
        this.tree[minChildIndex],
      ];

      this.siftDown(minChildIndex);
    }
  }
}

export { MinHeap };

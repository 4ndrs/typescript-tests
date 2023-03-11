class LinkedNode<T> {
  value: T;
  next: LinkedNode<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  private head_: LinkedNode<T> | undefined;
  private tail_: LinkedNode<T> | undefined;
  private length_ = 0;

  constructor(value?: T) {
    if (value !== undefined) {
      this.unshift(value);
    }
  }

  public unshift = (value: T) => {
    const node = new LinkedNode(value);

    if (this.head) {
      node.next = this.head_;
    } else {
      this.tail_ = node;
    }

    this.head_ = node;
    this.length_ += 1;
  };

  public push = (value: T) => {
    const node = new LinkedNode(value);

    if (this.tail_) {
      this.tail_.next = node;
      this.tail_ = node;
      this.length_ += 1;

      return;
    }

    this.head_ = node;
    this.tail_ = node;
    this.length_ += 1;
  };

  [Symbol.iterator] = () => {
    const generator = this.getGenerator();

    return generator();
  };

  get head() {
    if (this.head_) {
      return this.head_.value;
    }
  }

  get tail() {
    if (this.tail_) {
      return this.tail_.value;
    }
  }

  get length() {
    return this.length_;
  }

  public toArray = () => {
    const generator = this.getGenerator();

    return Array.from<T>(generator());
  };

  private getGenerator = () => {
    let node = this.head_;

    return function* () {
      while (node) {
        yield node.value;
        node = node.next;
      }
    };
  };
}

export { LinkedList };

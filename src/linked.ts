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

  public shift = () => {
    if (!this.head_) {
      return;
    }

    const value = this.head_.value;

    this.head_ = this.head_.next;

    if (!this.head_) {
      this.tail_ = this.head_;
    }

    this.length_ -= 1;

    return value;
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

  public pop = () => {
    if (!this.tail_) {
      return;
    }

    const value = this.tail_.value;

    // O(n)
    const previousNode = [...this.nodeGenerator()].find(
      (node) => node.next && !node.next.next
    );

    if (!previousNode) {
      this.head_ = previousNode;
    }

    this.tail_ = previousNode;

    if (this.tail_) {
      this.tail_.next = undefined;
    }

    this.length_ -= 1;

    return value;
  };

  [Symbol.iterator] = () => this.valueGenerator();

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

  public toArray = () => Array.from<T>(this.valueGenerator());

  private *valueGenerator() {
    for (let node = this.head_; node !== undefined; node = node.next) {
      yield node.value;
    }
  }

  private *nodeGenerator() {
    for (let node = this.head_; node !== undefined; node = node.next) {
      yield node;
    }
  }
}

export { LinkedList };

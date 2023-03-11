class Node<T> {
  value: T;
  next: Node<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

class Linked<T> {
  private head_: Node<T> | undefined;
  private tail_: Node<T> | undefined;
  private length_ = 0;

  constructor(value?: T) {
    if (value !== undefined) {
      this.unshift(value);
    }
  }

  protected unshift(value: T) {
    const node = new Node(value);

    if (this.head) {
      node.next = this.head_;
    } else {
      this.tail_ = node;
    }

    this.head_ = node;
    this.length_ += 1;
  }

  protected shift() {
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
  }

  protected push(value: T) {
    const node = new Node(value);

    if (this.tail_) {
      this.tail_.next = node;
      this.tail_ = node;
      this.length_ += 1;

      return;
    }

    this.head_ = node;
    this.tail_ = node;
    this.length_ += 1;
  }

  protected pop() {
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
  }

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

class LinkedList<T> extends Linked<T> {
  public shift() {
    return super.shift();
  }

  public unshift(value: T) {
    return super.unshift(value);
  }

  public pop() {
    return super.pop();
  }

  public push(value: T) {
    return super.push(value);
  }
}

export { LinkedList, Linked };
